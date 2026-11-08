import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../store';
import {
  getRegexStageConfigOrThrow,
  moveToNextStage,
  stageCompleteAction,
  _moveToPreviousStage,
  startModule,
  _continueModule,
} from './moduleProgress';
import { startOverModule } from './overallProgress';

export interface InputState {
  value: string;
}

export const initialState: InputState = {
  value: '',
};

export const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    setValue: (state, { payload }: PayloadAction<string>) => {
      state.value = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startModule, () => initialState);
    builder.addCase(_continueModule, () => initialState);
    builder.addCase(startOverModule, () => initialState);
    builder.addCase(moveToNextStage, () => initialState);
    builder.addCase(_moveToPreviousStage, () => initialState);
  },
});

const { setValue } = inputSlice.actions;

export const getInputValue = (state: AppState) => state.input.value;

export const getMatches = createSelector(
  [getInputValue, getRegexStageConfigOrThrow],
  (inputValue, stageConfig) => {
    if (!stageConfig || !stageConfig.searchBody || !inputValue.length) {
      return null;
    }
    let regex;
    try {
      regex = new RegExp(inputValue, 'g');
    } catch {
      return false;
    }
    const matches = [];
    const lastIndexes: Record<number, boolean> = {};
    let match;
    lastIndexes[regex.lastIndex] = true;
    while ((match = regex.exec(stageConfig.searchBody))) {
      lastIndexes[regex.lastIndex] = true;
      matches.push(match);
      // exec does not advance after an empty match, so move past it ourselves.
      if (match[0].length === 0) {
        regex.lastIndex += 1;
      }
    }
    return matches;
  },
);

export const getHasError = createSelector(
  getMatches,
  (matches) => matches === false,
);

// Read the complete native input value so paste, selection, deletion and mobile
// keyboard input all follow the same answer validation path.
export const updateInput =
  (value: string): AppThunk =>
  (dispatch, getState) => {
    dispatch(setValue(value));
    const stageConfig = getRegexStageConfigOrThrow(getState());
    if (
      value === stageConfig.answer ||
      stageConfig.acceptedAnswers?.includes(value)
    ) {
      dispatch(stageCompleteAction());
    }
  };

export default inputSlice.reducer;
