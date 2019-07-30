import { createSelector } from "reselect";
import { getStageConfig } from "./progressSelectors";

const getInput = state => state.input;
const createInputSelector = key =>
  createSelector(
    getInput,
    input => input.get(key)
  );

export const getInputValue = createInputSelector("value");
export const getCaretPos = createInputSelector("caretPos");

export const getMatches = createSelector(
  [getInputValue, getStageConfig],
  (inputValue, { searchBody }) => {
    if (!searchBody || !inputValue.length) {
      return null;
    }
    const regexp = new RegExp(inputValue, "g");
    // TODO - add polyfill
    const matches = [...searchBody.matchAll(regexp)];
    return matches;
  }
);
