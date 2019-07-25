import { KEY_DOWN } from "../actions/actionTypes";

export default function input(state = "just type!", action) {
  switch (action.type) {
    case KEY_DOWN:
      return state + action.key;
    default:
      return state;
  }
}
