import { MOVE_TO_NEXT_STAGE, MOVE_TO_PREVIOUS_STAGE } from "./actionTypes";

export const moveToNextStage = () => ({
  type: MOVE_TO_NEXT_STAGE
});

export const moveToPreviousStage = () => ({
  type: MOVE_TO_PREVIOUS_STAGE
});
