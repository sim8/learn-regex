import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../store';
import {
  MODULES,
  MODULES_CONFIG,
  STAGE_CONFIG,
  STAGE_TYPES,
} from '../constants/lessonConfig';
import {
  ACTIONS as TRACKING_ACTIONS,
  CATEGORIES as TRACKING_CATEGORIES,
} from '../constants/trackingConstants';
import { ChoiceStage, ModuleKey, RegexStage, StageKey } from '../types';
import {
  getAllModulesProgress,
  completeModule,
  startOverModule,
  markStageAsComplete,
} from './overallProgress';
import { event } from '../lib/gtag';

type Answers = Record<StageKey, number>;

export interface ModuleProgressState {
  moduleId: ModuleKey | null;
  stageIndex: number;
  answers: Answers;
  isComplete: boolean;
}

export const initialState: ModuleProgressState = {
  moduleId: MODULES.BASICS,
  stageIndex: 0,
  answers: {} as Answers,
  isComplete: false,
};

export const moduleProgressSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    moveToNextStage: (state) => {
      state.stageIndex += 1;
    },
    _moveToPreviousStage: (state) => {
      state.stageIndex -= 1;
    },
    _submitAnswer: (
      state,
      {
        payload,
      }: PayloadAction<{
        stage: StageKey;
        answer: number;
      }>
    ) => {
      state.answers[payload.stage] = payload.answer;
    },
    returnToAllModules: () => ({
      ...initialState,
      moduleId: null,
    }),
    startModule: (state, { payload: moduleId }: PayloadAction<ModuleKey>) => ({
      ...initialState,
      moduleId,
    }),
    _continueModule: (
      state,
      {
        payload: { moduleId, highestCompletedStageIndex },
      }: PayloadAction<{
        moduleId: ModuleKey;
        highestCompletedStageIndex: number;
      }>
    ) => ({
      ...initialState,
      moduleId,
      stageIndex: highestCompletedStageIndex + 1,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(completeModule, (state) => {
      state.isComplete = true;
    });
    builder.addCase(startOverModule, (state, { payload: moduleId }) => ({
      ...initialState,
      moduleId,
    }));
  },
});

export const {
  moveToNextStage,
  _moveToPreviousStage,
  _submitAnswer,
  returnToAllModules,
  startModule,
  _continueModule,
} = moduleProgressSlice.actions;

export const getModuleProgress = (state: AppState) => state.moduleProgress;

function createModuleProgressSelector<K extends keyof ModuleProgressState>(
  key: K
) {
  return createSelector(
    getModuleProgress,
    (moduleProgress) => moduleProgress[key]
  );
}

export const getModuleId = createModuleProgressSelector('moduleId');
const getModuleIdOrThrow = createSelector(getModuleId, (moduleId) => {
  // if (!moduleId) {
  //   throw new Error('Using moduleId when not defined');
  // }
  return moduleId as ModuleKey;
});

export const getStageIndex = createModuleProgressSelector('stageIndex');
const getCurrentModuleProgress = createSelector(
  [getAllModulesProgress, getModuleIdOrThrow],
  (modules, moduleId) => {
    return modules[moduleId];
  }
);
export const getHighestCompletedStageIndex = createSelector(
  getCurrentModuleProgress,
  (currentModule) =>
    currentModule ? currentModule.highestCompletedStageIndex : -1
);
export const getModuleIsComplete = createModuleProgressSelector('isComplete');
export const getProvidedAnswers = createModuleProgressSelector('answers');
export const getModuleConfig = createSelector(
  getModuleIdOrThrow,
  (moduleId) => MODULES_CONFIG[moduleId]
);

export const getStageId = createSelector(
  [getModuleConfig, getStageIndex],
  (moduleConfig, stageIndex) => moduleConfig && moduleConfig.stages[stageIndex]
);

export const getIsFinalStageInModule = createSelector(
  [getModuleConfig, getStageIndex],
  (moduleConfig, stageIndex) => stageIndex + 1 === moduleConfig.stages.length
);

export const getStageConfig = createSelector(
  getStageId,
  (stageId) => STAGE_CONFIG[stageId]
);

export const getCanMoveToNextStage = createSelector(
  [getStageIndex, getHighestCompletedStageIndex, getStageConfig],
  (index, highestIndex, config) =>
    highestIndex >= index || config.type === STAGE_TYPES.INFO
);

export const getCanMoveToPreviousStage = createSelector(
  [getStageIndex],
  (index) => index > 0
);

export const getProvidedAnswerForStage = createSelector(
  [getProvidedAnswers, getStageId],
  (answers, stageId) => answers[stageId]
);

// TODO can we improve this?
const getAnswerOrThrow = createSelector(getStageConfig, (config) => {
  // if (config.type === STAGE_TYPES.INFO) {
  //   throw new Error('Using answer when not defined in stage');
  // }
  return (config as RegexStage | ChoiceStage).answer;
});

// TODO can we improve this?
export const getRegexStageConfigOrThrow = createSelector(
  getStageConfig,
  (config) => {
    // if (config.type !== STAGE_TYPES.REGEX) {
    //   throw new Error(
    //     'Using a regex stage when current stage is not regex type'
    //   );
    // }
    return config as RegexStage;
  }
);

export const getProvidedAnswerIsCorrect = createSelector(
  [getProvidedAnswerForStage, getAnswerOrThrow],
  (provided, answer) => provided === answer
);

export const stageCompleteAction =
  (action?: PayloadAction<unknown>): AppThunk =>
  (dispatch, getState) => {
    const state = getState();
    const stageIndex = getStageIndex(state);
    const prevHighestCompletedStageIndex = getHighestCompletedStageIndex(state);
    dispatch(
      markStageAsComplete({
        moduleId: getModuleIdOrThrow(state),
        highestCompletedStageIndex: Math.max(
          stageIndex,
          prevHighestCompletedStageIndex
        ),
      })
    );
    if (action) dispatch(action);
  };

export const moveToNextScreen = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const stageId = getStageId(state);
  const stageIndex = getStageIndex(state);
  const isFinalStageInModule = getIsFinalStageInModule(state);
  if (isFinalStageInModule) {
    const moduleId = getModuleIdOrThrow(state);
    dispatch(stageCompleteAction(completeModule(moduleId)));
    event(TRACKING_ACTIONS.COMPLETE_MODULE, {
      category: TRACKING_CATEGORIES.MODULE,
      label: moduleId,
    });
  } else {
    dispatch(stageCompleteAction(moveToNextStage()));
    event(TRACKING_ACTIONS.MOVE_TO_NEXT_STAGE, {
      category: TRACKING_CATEGORIES.STAGE,
      label: stageId,
      value: stageIndex,
    });
  }
};

export const moveToPreviousStage = (): AppThunk => (dispatch, getState) => {
  const stageId = getStageId(getState());
  event(TRACKING_ACTIONS.MOVE_TO_PREVIOUS_STAGE, {
    category: TRACKING_CATEGORIES.STAGE,
    label: stageId,
  });
  dispatch(_moveToPreviousStage());
};

export const submitAnswer = (stage: StageKey, answer: number) =>
  stageCompleteAction(_submitAnswer({ stage, answer }));

export const continueModule =
  (moduleId: ModuleKey): AppThunk =>
  (dispatch, getState) => {
    const { highestCompletedStageIndex } = getAllModulesProgress(getState())[
      moduleId
    ];
    dispatch(
      _continueModule({
        moduleId,
        highestCompletedStageIndex,
      })
    );
  };

export default moduleProgressSlice.reducer;
