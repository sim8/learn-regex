import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '../store';
import {
  getRegexStageConfig,
  moveToNextStage,
  _moveToPreviousStage,
} from './moduleProgress';

export interface InputState {
  value: string;
  caretPos: number;
}

const initialState: InputState = {
  value: '',
  caretPos: 0,
};

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    enterCharacter: (state, { payload: char }: PayloadAction<string>) => {
      const { value, caretPos } = state;
      state.value = `${value.slice(0, caretPos)}${char}${value.slice(
        caretPos
      )}`;
    },
    backspace: (state) => {
      const { value, caretPos } = state;
      if (caretPos > 0) {
        state.value = `${value.slice(0, caretPos - 1)}${value.slice(caretPos)}`;
        state.caretPos -= 1;
      }
    },
    keyLeft: (state) => {
      const { caretPos } = state;
      if (caretPos > 0) {
        state.caretPos -= 1;
      }
    },
    keyRight: (state) => {
      const { value, caretPos } = state;
      if (caretPos < value.length) {
        state.caretPos += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(moveToNextStage, () => initialState);
    builder.addCase(_moveToPreviousStage, () => initialState);
  },
});

export const getInputValue = (state: AppState) => state.input.value;
export const getCaretPos = (state: AppState) => state.input.caretPos;

export const getMatches = createSelector(
  [getInputValue, getRegexStageConfig],
  (inputValue, stageConfig) => {
    if (!stageConfig || !stageConfig.searchBody || !inputValue.length) {
      return null;
    }
    let regex;
    try {
      regex = new RegExp(inputValue, 'g');
    } catch (e) {
      return false;
    }
    const matches = [];
    const lastIndexes: Record<number, boolean> = {};
    let match;
    lastIndexes[regex.lastIndex] = true;
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(stageConfig.searchBody))) {
      lastIndexes[regex.lastIndex] = true;
      matches.push(match);
    }
    return matches;
  }
);

export const getHasError = createSelector(
  getMatches,
  (matches) => matches === false
);

export default inputSlice.reducer;
