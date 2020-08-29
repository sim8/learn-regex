import { createSelector } from 'reselect';
import {
  STAGE_CONFIG,
  STAGE_TYPES,
  MODULES_CONFIG,
} from '../constants/lessonConfig';

const getProgress = state => state.progress;
const createProgressSelector = key =>
  createSelector(getProgress, progress => progress.get(key));

export const getModuleId = createProgressSelector('moduleId');
export const getStageIndex = createProgressSelector('stageIndex');
export const getHighestCompletedStageIndex = createProgressSelector(
  'highestCompletedStageIndex'
);
export const getProvidedAnswers = createProgressSelector('answers');
export const getModuleComplete = createProgressSelector('moduleComplete');

export const getModuleConfig = createSelector(
  getModuleId,
  moduleId => MODULES_CONFIG[moduleId]
);

export const getStageId = createSelector(
  [getModuleConfig, getStageIndex],
  (moduleConfig, stageIndex) => moduleConfig.stages[stageIndex]
);

export const getIsFinalStageInModule = createSelector(
  [getModuleConfig, getStageIndex],
  (moduleConfig, stageIndex) => stageIndex + 1 === moduleConfig.stages.length
);

export const getStageConfig = createSelector(
  getStageId,
  stageId => STAGE_CONFIG[stageId]
);

export const getCanMoveToNextStage = createSelector(
  [getStageIndex, getHighestCompletedStageIndex, getStageConfig],
  (index, highestIndex, config) =>
    highestIndex >= index || config.type === STAGE_TYPES.INFO
);

export const getCanMoveToPreviousStage = createSelector(
  [getStageIndex],
  index => index > 0
);

export const getProvidedAnswerForStage = createSelector(
  [getProvidedAnswers, getStageId],
  (answers, stageId) => answers.get(stageId)
);

export const getProvidedAnswerIsCorrect = createSelector(
  [getProvidedAnswerForStage, getStageConfig],
  (provided, { answer }) => provided === answer
);
