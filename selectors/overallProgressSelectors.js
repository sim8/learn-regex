import { createSelector } from 'reselect';
import { MODULES_CONFIG } from '../constants/lessonConfig';

const calculateCompletionPercentage = (module, key) =>
  module.get('hasEverBeenCompleted')
    ? 1
    : (module.get('highestCompletedStageIndex') + 1) /
      MODULES_CONFIG[key].stages.length;

const getOverallProgress = state => state.overallProgress;
const createOverallProgressSelector = key =>
  createSelector(getOverallProgress, overallProgress =>
    overallProgress.get(key)
  );

export const getAllModulesProgress = createOverallProgressSelector('modules');

export const getModuleCompletionPercentages = createSelector(
  getAllModulesProgress,
  modules => modules.map(calculateCompletionPercentage)
);
