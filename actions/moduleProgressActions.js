import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE,
  MARK_STAGE_AS_COMPLETE,
  SUBMIT_ANSWER,
  COMPLETE_MODULE,
  RETURN_TO_ALL_MODULES,
  START_MODULE,
  START_OVER_MODULE,
  CONTINUE_MODULE,
} from './actionTypes';
import {
  ACTIONS as TRACKING_ACTIONS,
  CATEGORIES as TRACKING_CATEGORIES,
} from '../constants/trackingConstants';
import {
  getStageId,
  getIsFinalStageInModule,
  getModuleId,
  getStageIndex,
  getHighestCompletedStageIndex,
} from '../selectors/moduleProgressSelectors';
import { event } from '../lib/gtag';
import { getAllModulesProgress } from '../selectors/overallProgressSelectors';
import { STAGE_TYPES } from '../constants/lessonConfig';
import { stageByIndex } from '../utils/configUtils';

/**
 * Marks the current stage as complete before dispatching the passed action
 * @param {*} action redux action
 */
export const stageCompleteAction = action => (dispatch, getState) => {
  const state = getState();
  const stageIndex = getStageIndex(state);
  const prevHighestCompletedStageIndex = getHighestCompletedStageIndex(state);
  dispatch({
    type: MARK_STAGE_AS_COMPLETE,
    moduleId: getModuleId(state),
    highestCompletedStageIndex: Math.max(
      stageIndex,
      prevHighestCompletedStageIndex
    ),
  });
  if (action) dispatch(action);
};

/**
 * Get prefilled answer for a stage if it's a regex test that has previously been completed.
 * @param {*} state
 * @param {*} stageIndex
 */
const maybeGetPrefilledAnswer = (state, stageIndex) => {
  const moduleId = getModuleId(state);
  const highestCompletedStageIndex = getHighestCompletedStageIndex(state);
  const { type, answer } = stageByIndex(moduleId, stageIndex);
  if (stageIndex <= highestCompletedStageIndex && type === STAGE_TYPES.REGEX) {
    return answer;
  }
  return null;
};

export const moveToNextScreen = () => (dispatch, getState) => {
  const state = getState();
  const isFinalStageInModule = getIsFinalStageInModule(state);

  if (isFinalStageInModule) {
    const moduleId = getModuleId(state);
    dispatch(
      stageCompleteAction({
        type: COMPLETE_MODULE,
        moduleId,
      })
    );
    event(TRACKING_ACTIONS.COMPLETE_MODULE, {
      category: TRACKING_CATEGORIES.MODULE,
      label: moduleId,
    });
  } else {
    const stageId = getStageId(state);
    const nextStageIndex = getStageIndex(state) + 1;
    dispatch(
      stageCompleteAction({
        type: MOVE_TO_NEXT_STAGE,
        prefilledAnswer: maybeGetPrefilledAnswer(state, nextStageIndex),
      })
    );
    event(TRACKING_ACTIONS.MOVE_TO_NEXT_STAGE, {
      category: TRACKING_CATEGORIES.STAGE,
      label: stageId,
    });
  }
};

export const moveToPreviousStage = () => (dispatch, getState) => {
  const state = getState();
  const stageId = getStageId(state);
  const prevStageIndex = getStageIndex(state) - 1;

  event(TRACKING_ACTIONS.MOVE_TO_PREVIOUS_STAGE, {
    category: TRACKING_CATEGORIES.STAGE,
    label: stageId,
  });
  dispatch({
    type: MOVE_TO_PREVIOUS_STAGE,
    prefilledAnswer: maybeGetPrefilledAnswer(state, prevStageIndex),
  });
};

export const submitAnswer = (stage, answer) =>
  stageCompleteAction({
    type: SUBMIT_ANSWER,
    stage,
    answer,
  });

export const returnToAllModules = () => ({
  type: RETURN_TO_ALL_MODULES,
});

export const startModule = moduleId => ({
  type: START_MODULE,
  moduleId,
});

export const continueModule = moduleId => (dispatch, getState) => {
  const progress = getAllModulesProgress(getState()).get(moduleId);
  dispatch({
    type: CONTINUE_MODULE,
    moduleId,
    highestCompletedStageIndex: progress.get('highestCompletedStageIndex'),
  });
};

export const startOverModule = moduleId => ({
  type: START_OVER_MODULE,
  moduleId,
});
