import {
  ENTER_CHARACTER,
  KEY_LEFT,
  KEY_RIGHT,
  BACKSPACE,
  ENTER
} from "./actionTypes";
import { getInputValue } from "../selectors/inputSelectors";
import { getStageConfig } from "../selectors/progressSelectors";
import { moveToNextStage } from "./progressActions";

export const keyPress = ({ key, ...rest }) => (dispatch, getState) => {
  if (key === "Enter") {
    const state = getState();
    const stageConfig = getStageConfig(state);
    if (stageConfig.type === "LESSON") {
      dispatch(moveToNextStage());
    } else if (stageConfig.type === "TEST") {
      const inputValue = getInputValue(state);
      if (inputValue === stageConfig.answer) {
        dispatch(moveToNextStage());
      }
    }
    return;
  }
  dispatch({
    type: ENTER_CHARACTER,
    char: key
  });
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
