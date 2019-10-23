import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE,
  SUBMIT_ANSWER
} from "./actionTypes";
import {
  ACTIONS as TRACKING_ACTIONS,
  CATEGORIES as TRACKING_CATEGORIES
} from "../constants/trackingConstants";

export const moveToNextStage = () => {
  event(TRACKING_ACTIONS.MOVE_TO_NEXT_STAGE, {
    category: TRACKING_CATEGORIES.STAGE,
    label: stageId
  });
  return {
    type: MOVE_TO_NEXT_STAGE
  };
};

export const moveToPreviousStage = () => {
  event(TRACKING_ACTIONS.MOVE_TO_PREVIOUS_STAGE, {
    category: TRACKING_CATEGORIES.STAGE,
    label: stageId
  });
  return {
    type: MOVE_TO_PREVIOUS_STAGE
  };
};

export const 

export const submitAnswer = (stage, answer) => ({
  type: SUBMIT_ANSWER,
  stage,
  answer
});
