import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE,
  SUBMIT_ANSWER
} from "./actionTypes";

export const moveToNextStage = () => ({
  type: MOVE_TO_NEXT_STAGE
});

export const moveToPreviousStage = () => ({
  type: MOVE_TO_PREVIOUS_STAGE
});

export const submitAnswer = (stage, answer) => ({
  type: SUBMIT_ANSWER,
  stage,
  answer
});
