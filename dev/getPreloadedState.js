import { fromJS } from 'immutable';
import { MODULES } from '../constants/lessonConfig';

export default function getPreloadedState() {
  // return {};
  return {
    moduleProgress: fromJS({
      moduleId: MODULES.BASICS,
      stageIndex: 17,
      highestCompletedStageIndex: 17,
      answers: {},
      moduleComplete: false,
    }),
    overallProgress: fromJS({
      completedModules: {},
    }),
  };
}
