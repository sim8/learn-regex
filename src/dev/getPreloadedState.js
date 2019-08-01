import { fromJS } from "immutable";
import { MODULES } from "../constants/lessonConfig";

export default function getPreloadedState() {
  return {
    progress: fromJS({
      moduleId: MODULES.WELCOME,
      stageIndex: 2,
      highestStageIndexReached: 2
    })
  };
}