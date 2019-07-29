import { createSelector } from "reselect";
import { STAGE_CONFIG, MODULES_CONFIG } from "../constants/lessonConfig";

const getProgress = state => state.progress;
const createProgressSelector = key =>
  createSelector(
    getProgress,
    progress => progress.get(key)
  );

export const getModuleId = createProgressSelector("moduleId");
export const getStageIndex = createProgressSelector("stageIndex");
export const getHighestStageIndexReached = createProgressSelector(
  "highestStageIndexReached"
);

const getModuleConfig = createSelector(
  getModuleId,
  moduleId => MODULES_CONFIG[moduleId]
);

export const getStageConfig = createSelector(
  [getModuleConfig, getStageIndex],
  (moduleConfig, stageIndex) => STAGE_CONFIG[moduleConfig.stages[stageIndex]]
);

export const getCanMoveToNextStage = createSelector(
  [getStageIndex, getHighestStageIndexReached, getStageConfig],
  (index, highestIndex, config) =>
    highestIndex > index || config.type === "LESSON"
);

export const getCanMoveToPreviousStage = createSelector(
  [getStageIndex],
  index => index > 0
);
