import { createSelector } from 'reselect';

const getOverallProgress = state => state.overallProgress;
const createOverallProgressSelector = key =>
  createSelector(getOverallProgress, overallProgress =>
    overallProgress.get(key)
  );

// eslint-disable-next-line import/prefer-default-export
export const getAllModulesProgress = createOverallProgressSelector('modules');
