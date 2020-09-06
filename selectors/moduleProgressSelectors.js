import { createSelector } from 'reselect';
import {
  STAGE_CONFIG,
  STAGE_TYPES,
  MODULES_CONFIG,
} from '../constants/lessonConfig';
import { getAllModulesProgress } from './overallProgressSelectors';

const getModuleProgress = state => state.moduleProgress;
const createModuleProgressSelector = key =>
  createSelector(getModuleProgress, moduleProgress => moduleProgress.get(key));

export const getModuleId = createModuleProgressSelector('moduleId');
export const getStageIndex = createModuleProgressSelector('stageIndex');
const getCurrentModuleProgress = createSelector(
  [getAllModulesProgress, getModuleId],
  (modules, moduleId) => {
    return modules.get(moduleId);
  }
);
export const getHighestCompletedStageIndex = createSelector(
  getCurrentModuleProgress,
  currentModule =>
    currentModule ? currentModule.get('highestCompletedStageIndex') : -1
);
export const getCurrentModuleCompletionPercentage = createSelector(
  [getStageIndex, getModuleId],
  (stageIndex, id) => stageIndex / MODULES_CONFIG[id].stages.length
);

export const getModuleIsComplete = createModuleProgressSelector('isComplete');
export const getProvidedAnswers = createModuleProgressSelector('answers');
export const getModuleConfig = createSelector(
  getModuleId,
  moduleId => MODULES_CONFIG[moduleId]
);

export const getStageId = createSelector(
  [getModuleConfig, getStageIndex],
  (moduleConfig, stageIndex) => moduleConfig && moduleConfig.stages[stageIndex]
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
