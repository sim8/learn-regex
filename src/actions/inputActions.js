import {
  ENTER_CHARACTER,
  KEY_LEFT,
  KEY_RIGHT,
  BACKSPACE,
  STAGE_COMPLETE
} from "./actionTypes";
import { getInputValue } from "../selectors/inputSelectors";
import { getStageConfig } from "../selectors/progressSelectors";
import { moveToNextStage } from "./progressActions";

export const keyPress = ({ key, ...rest }) => (dispatch, getState) => {
  const state = getState();
  const stageConfig = getStageConfig(state);
  if (key === "Enter") {
    if (stageConfig.type === "LESSON") {
      dispatch(moveToNextStage());
    } else if (stageConfig.type === "TEST") {
    }
    return;
  }
  dispatch({
    type: ENTER_CHARACTER,
    char: key
  });
  const inputValue = getInputValue(getState());
  console.log(inputValue, stageConfig.answer);
  if (inputValue === stageConfig.answer) {
    dispatch({
      type: STAGE_COMPLETE
    });
  }
};

export const keyDown = ({ key, altKey }) => dispatch => {
  switch (key) {
    case "ArrowLeft":
      dispatch({
        type: KEY_LEFT,
        altKey
      });
      break;
    case "ArrowRight":
      dispatch({
        type: KEY_RIGHT,
        altKey
      });
      break;
    case "Backspace":
      dispatch({
        type: BACKSPACE,
        altKey
      });
      break;
    default:
      return;
  }
};
