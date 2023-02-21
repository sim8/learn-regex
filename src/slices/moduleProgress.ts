import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../store';
import {
  MODULES,
  MODULES_CONFIG,
  STAGE_CONFIG,
  STAGE_TYPES,
} from '../constants/lessonConfig';
import { ModuleKey, StageKey } from '../types';
import { getAllModulesProgress } from './overallProgress';

type Answers = Record<StageKey, number>;

export interface ModuleProgressState {
  moduleId: ModuleKey | null;
  stageIndex: number;
  answers: Answers;
  isComplete: boolean;
}

const initialState: ModuleProgressState = {
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
    moveToPreviousStage: (state) => {
      state.stageIndex -= 1;
    },
    submitAnswer: (
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
    // TODO dedupe
    startOverModule: (
      state,
      { payload: moduleId }: PayloadAction<ModuleKey>
    ) => ({
      ...initialState,
      moduleId,
    }),
    completeModule: (state) => {
      state.isComplete = true;
    },
    continueModule: (
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
});

export const {
  moveToNextStage,
  moveToPreviousStage,
  submitAnswer,
  returnToAllModules,
  startModule,
  startOverModule,
  completeModule,
  continueModule,
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
  if (!moduleId) {
    throw new Error('Using moduleId when not defined');
  }
  return moduleId;
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
  if (config.type === STAGE_TYPES.INFO) {
    throw new Error('Using answer when not defined in stage');
  }
  return config.answer;
});

// TODO can we improve this?
export const getRegexStageConfig = createSelector(getStageConfig, (config) => {
  if (config.type !== STAGE_TYPES.REGEX) {
    throw new Error('Using a regex stage when current stage is not regex type');
  }
  return config;
});

export const getProvidedAnswerIsCorrect = createSelector(
  [getProvidedAnswerForStage, getAnswerOrThrow],
  (provided, answer) => provided === answer
);

export default moduleProgressSlice.reducer;
