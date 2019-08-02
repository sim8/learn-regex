import { fromJS } from "immutable";
import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE,
  STAGE_COMPLETE
} from "../actions/actionTypes";
import { MODULES } from "../constants/lessonConfig";

const initialState = fromJS({
  moduleId: MODULES.WELCOME,
  stageIndex: 0,
  highestCompletedStageIndex: -1
});

export default function progress(state = initialState, { ...action }) {
  switch (action.type) {
    case MOVE_TO_NEXT_STAGE: {
      const prevStageIndex = state.get("stageIndex");
      return state
        .set("stageIndex", prevStageIndex + 1)
        .update("highestCompletedStageIndex", highest =>
          Math.max(prevStageIndex, highest)
        );
    }
    case MOVE_TO_PREVIOUS_STAGE:
      return state.update("stageIndex", i => i - 1);
    case STAGE_COMPLETE:
      return state.update("highestCompletedStageIndex", highest =>
        Math.max(state.get("stageIndex"), highest)
      );
    default:
      return state;
  }
}
