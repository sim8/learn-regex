import progress from "../progress";
import { fromJS } from "immutable";
import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE
} from "../../actions/actionTypes";
import { MODULES } from "../../constants/lessonConfig";

it("updates the highestStageIndexReached", () => {
  const initialState = fromJS({
    moduleId: MODULES.WELCOME,
    stageIndex: 0,
    highestStageIndexReached: 0
  });
  const result = progress(initialState, { type: MOVE_TO_NEXT_STAGE });
  expect(result.toJS()).toEqual({
    moduleId: MODULES.WELCOME,
    stageIndex: 1,
    highestStageIndexReached: 1
  });
});

it("does not update the highestStageIndexReached if not surpassed", () => {
  const initialState = fromJS({
    moduleId: MODULES.WELCOME,
    stageIndex: 0,
    highestStageIndexReached: 2
  });
  const result = progress(initialState, { type: MOVE_TO_NEXT_STAGE });
  expect(result.toJS()).toEqual({
    moduleId: MODULES.WELCOME,
    stageIndex: 1,
    highestStageIndexReached: 2
  });
});
