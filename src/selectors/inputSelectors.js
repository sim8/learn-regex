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
    let regex;
    try {
      regex = new RegExp(inputValue, "g");
    } catch (e) {
      return false;
    }
    const matches = [];
    const lastIndexes = {};
    let match;
    lastIndexes[regex.lastIndex] = true;
    while ((match = regex.exec(searchBody))) {
      lastIndexes[regex.lastIndex] = true;
      matches.push(match);
    }
    return matches;
  }
);
