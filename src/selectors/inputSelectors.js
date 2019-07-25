import { createSelector } from "reselect";

const getInput = state => state.input;
const createInputSelector = key =>
  createSelector(
    getInput,
    input => input.get(key)
  );

export const getInputValue = createInputSelector("value");
export const getCaretPos = createInputSelector("caretPos");
