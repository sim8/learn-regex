import progress from "../progress";
import { fromJS } from "immutable";
import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE
} from "../../actions/actionTypes";
import { MODULES } from "../../constants/lessonConfig";

it("updates the highestCompletedStageIndex", () => {
  const initialState = fromJS({
    moduleId: MODULES.WELCOME,
    stageIndex: 0,
    highestCompletedStageIndex: -1
  });
  const result = progress(initialState, { type: MOVE_TO_NEXT_STAGE });
  expect(result.toJS()).toEqual({
    moduleId: MODULES.WELCOME,
    stageIndex: 1,
    highestCompletedStageIndex: 0
  });
});

it("does not update the highestCompletedStageIndex if not surpassed", () => {
  const initialState = fromJS({
    moduleId: MODULES.WELCOME,
    stageIndex: 0,
    highestCompletedStageIndex: 1
  });
  const result = progress(initialState, { type: MOVE_TO_NEXT_STAGE });
  expect(result.toJS()).toEqual({
    moduleId: MODULES.WELCOME,
    stageIndex: 1,
    highestCompletedStageIndex: 1
  });
});