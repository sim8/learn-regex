import { fromJS } from "immutable";
import { ENTER_CHARACTER } from "../actions/actionTypes";

const initialState = fromJS({
  value: "TypeType",
  caretPos: 7
});

export default function input(state = initialState, action) {
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
    default:
      return state;
  }
}
