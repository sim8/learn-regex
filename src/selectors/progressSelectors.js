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

export const getStageConfig = createSelector(
  [getModuleId, getStageIndex],
  (moduleId, stageIndex) =>
    STAGE_CONFIG[MODULES_CONFIG[moduleId].stages[stageIndex]]
);
