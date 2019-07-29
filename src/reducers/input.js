import { fromJS } from "immutable";
import {
  ENTER_CHARACTER,
  BACKSPACE,
  KEY_LEFT,
  KEY_RIGHT
} from "../actions/actionTypes";

const initialState = fromJS({
  value: "abcd",
  caretPos: 4
});

export default function input(state = initialState, { altKey, ...action }) {
  const caretPos = state.get("caretPos");
  console.log(action);
  switch (action.type) {
    case ENTER_CHARACTER:
      return state
        .update(
          "value",
          value =>
            `${value.slice(0, caretPos)}${action.char}${value.slice(caretPos)}`
        )
        .set("caretPos", caretPos + 1);
    case BACKSPACE:
      return caretPos > 0
        ? state
            .update(
              "value",
              value => `${value.slice(0, caretPos - 1)}${value.slice(caretPos)}`
            )
            .set("caretPos", caretPos - 1)
        : state;
    case KEY_LEFT:
      return caretPos > 0 ? state.set("caretPos", caretPos - 1) : state;
    case KEY_RIGHT:
      return caretPos < state.get("value").length
        ? state.set("caretPos", caretPos + 1)
        : state;
    default:
      return state;
  }
}
