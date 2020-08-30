import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE,
  SUBMIT_ANSWER,
  COMPLETE_MODULE,
  RETURN_TO_ALL_MODULES,
  START_MODULE,
} from './actionTypes';
import {
  ACTIONS as TRACKING_ACTIONS,
  CATEGORIES as TRACKING_CATEGORIES,
} from '../constants/trackingConstants';
import {
  getStageId,
  getIsFinalStageInModule,
  getModuleId,
} from '../selectors/moduleProgressSelectors';
import { event } from '../lib/gtag';

export const moveToNextScreen = () => (dispatch, getState) => {
  const state = getState();
  const stageId = getStageId(state);
  const isFinalStageInModule = getIsFinalStageInModule(state);
  if (isFinalStageInModule) {
    const moduleId = getModuleId(state);
    dispatch({
      type: COMPLETE_MODULE,
      moduleId,
    });
    event(TRACKING_ACTIONS.COMPLETE_MODULE, {
      category: TRACKING_CATEGORIES.MODULE,
      label: moduleId,
    });
  } else {
    dispatch({
      type: MOVE_TO_NEXT_STAGE,
    });
    event(TRACKING_ACTIONS.MOVE_TO_NEXT_STAGE, {
      category: TRACKING_CATEGORIES.STAGE,
      label: stageId,
    });
  }
};

export const moveToPreviousStage = () => (dispatch, getState) => {
  const stageId = getStageId(getState());
  event(TRACKING_ACTIONS.MOVE_TO_PREVIOUS_STAGE, {
    category: TRACKING_CATEGORIES.STAGE,
    label: stageId,
  });
  dispatch({
    type: MOVE_TO_PREVIOUS_STAGE,
  });
};

export const submitAnswer = (stage, answer) => ({
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
