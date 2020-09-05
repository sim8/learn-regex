import { createSelector } from 'reselect';
import { MODULES_CONFIG } from '../constants/lessonConfig';

const getOverallProgress = state => state.overallProgress;
const createOverallProgressSelector = key =>
  createSelector(getOverallProgress, overallProgress =>
    overallProgress.get(key)
  );

// eslint-disable-next-line import/prefer-default-export
export const getAllModulesProgress = createOverallProgressSelector('modules');

const getCompletionPercentage = (module, key) =>
  module.get('hasEverBeenCompleted')
    ? 1
    : (module.get('highestCompletedStageIndex') + 1) /
      MODULES_CONFIG[key].stages.length;

export const getModuleCompletionPercentages = createSelector(
  getAllModulesProgress,
  modules => modules.map(getCompletionPercentage)
);
