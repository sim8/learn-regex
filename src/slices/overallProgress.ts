import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, AppThunk } from '../store';
import { MODULES_CONFIG } from '../constants/lessonConfig';
import { ModuleKey, StageKey } from '../types';

type ModuleCompletion = {
  highestCompletedStageIndex: number;
  hasEverBeenCompleted: boolean;
};

type ModulesCompletion = Record<ModuleKey, ModuleCompletion>;

export interface OverallProgressState {
  modules: ModulesCompletion;
}

const initialState: OverallProgressState = {
  modules: {} as ModulesCompletion,
};

export const overallProgressSlice = createSlice({
  name: 'overallProgress',
  initialState,
  reducers: {
    markStageAsComplete: (
      state,
      {
        payload: { moduleId, highestCompletedStageIndex },
      }: PayloadAction<{
        moduleId: ModuleKey;
        highestCompletedStageIndex: number;
      }>
    ) => {
      state.modules[moduleId].highestCompletedStageIndex =
        highestCompletedStageIndex;
    },
    completeModule: (state, { payload }: PayloadAction<ModuleKey>) => {
      state.modules[payload].hasEverBeenCompleted = true;
    },
    startOverModule: (state, { payload }: PayloadAction<ModuleKey>) => {
      delete state.modules[payload];
    },
  },
});

export const { markStageAsComplete, completeModule, startOverModule } =
  overallProgressSlice.actions;

export const getOverallProgress = (state: AppState) => state.overallProgress;

export const getAllModulesProgress = createSelector(
  getOverallProgress,
  (overallProgress) => overallProgress.modules
);

const getCompletionPercentage = (module: ModuleCompletion, key: ModuleKey) =>
  module.hasEverBeenCompleted
    ? 1
    : (module.highestCompletedStageIndex + 1) /
      MODULES_CONFIG[key].stages.length;

type ModuleCompletionPercentages = Record<ModuleKey, number>;
export const getModuleCompletionPercentages = createSelector(
  getAllModulesProgress,
  (modules) =>
    (
      Object.keys(modules) as Array<ModuleKey>
    ).reduce<ModuleCompletionPercentages>((acc, key) => {
      acc[key] = getCompletionPercentage(modules[key], key);
      return acc;
    }, {} as ModuleCompletionPercentages)
);

export default overallProgressSlice.reducer;
