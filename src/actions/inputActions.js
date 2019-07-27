import { ENTER_CHARACTER, KEY_LEFT, KEY_RIGHT, BACKSPACE } from "./actionTypes";

export const keyPress = ({ key }) => {
  return {
    type: ENTER_CHARACTER,
    char: key
  };
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
