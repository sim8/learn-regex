import { fromJS } from "immutable";
import { MODULES } from "../constants/lessonConfig";

export default function getPreloadedState() {
  // return {};
  return {
    progress: fromJS({
      moduleId: MODULES.WELCOME,
      stageIndex: 2,
      highestCompletedStageIndex: 1,
      answers: {}
    })
  };
}
