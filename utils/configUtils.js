import { MODULES_CONFIG, STAGE_CONFIG } from '../constants/lessonConfig';

export const stageByIndex = (moduleId, stageIndex) => {
  const stageId = MODULES_CONFIG[moduleId].stages[stageIndex];
  return STAGE_CONFIG[stageId];
};
