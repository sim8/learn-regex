import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE,
  SUBMIT_ANSWER,
} from './actionTypes';
import {
  ACTIONS as TRACKING_ACTIONS,
  CATEGORIES as TRACKING_CATEGORIES,
} from '../constants/trackingConstants';
import { getStageId } from '../selectors/progressSelectors';
import { event } from '../lib/gtag';

export const moveToNextStage = () => (dispatch, getState) => {
  const stageId = getStageId(getState());
  event(TRACKING_ACTIONS.MOVE_TO_NEXT_STAGE, {
    category: TRACKING_CATEGORIES.STAGE,
    label: stageId,
  });
  dispatch({
    type: MOVE_TO_NEXT_STAGE,
  });
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
