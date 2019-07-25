import { ENTER_CHARACTER } from "./actionTypes";

export const keyDown = ({ key }) => {
  return {
    type: ENTER_CHARACTER,
    char: key
  };
};
