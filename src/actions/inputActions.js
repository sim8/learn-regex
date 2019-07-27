import { ENTER_CHARACTER } from "./actionTypes";

export const keyPress = ({ key }) => {
  return {
    type: ENTER_CHARACTER,
    char: key
  };
};

export const keyDown = ({ key }) => {
  return {
    type: null
  };
};
