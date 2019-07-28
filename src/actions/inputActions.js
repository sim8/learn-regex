import {
  ENTER_CHARACTER,
  KEY_LEFT,
  KEY_RIGHT,
  BACKSPACE,
  ENTER
} from "./actionTypes";

export const keyPress = ({ key, ...rest }) => {
  if (key === "Enter") {
    return { type: ENTER };
  }
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
