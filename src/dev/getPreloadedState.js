import { fromJS } from "immutable";
import { MODULES } from "../constants/lessonConfig";

export default function getPreloadedState() {
  // return {};
  return {
    progress: fromJS({
      moduleId: MODULES.WELCOME,
      stageIndex: 6,
      highestCompletedStageIndex: 5,
      answers: {}
    })
  };
}
