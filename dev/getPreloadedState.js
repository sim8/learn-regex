import { fromJS } from 'immutable';
import { MODULES } from '../constants/lessonConfig';

export default function getPreloadedState() {
  // return {};
  return {
    moduleProgress: fromJS({
      moduleId: MODULES.BASICS,
      stageIndex: 15,
      highestCompletedStageIndex: 15,
      answers: {},
      moduleComplete: true,
    }),
  };
}
