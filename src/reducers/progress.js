import { fromJS } from "immutable";
import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE
} from "../actions/actionTypes";
import { MODULES } from "../constants/lessonConfig";

const initialState = fromJS({
  moduleId: MODULES.WELCOME,
  stageIndex: 0,
  highestStageIndexReached: 0
});

export default function progress(state = initialState, { ...action }) {
  switch (action.type) {
    case MOVE_TO_NEXT_STAGE: {
      const newStageIndex = state.get("stageIndex") + 1;
      return state
        .set("stageIndex", newStageIndex)
        .update("highestStageIndexReached", highest =>
          Math.max(newStageIndex, highest)
        );
    }
    case MOVE_TO_PREVIOUS_STAGE:
      return state.update("stageIndex", i => i - 1);
    default:
      return state;
  }
}
