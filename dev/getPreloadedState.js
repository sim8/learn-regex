import { fromJS } from 'immutable';
import { MODULES } from '../constants/lessonConfig';

export default function getPreloadedState() {
  return {
    moduleProgress: fromJS({
      moduleId: MODULES.BASICS,
      stageIndex: 17,
      answers: {},
    }),
    overallProgress: fromJS({
      modules: {
        [MODULES.BASICS]: {
          highestCompletedStageIndex: 17,
          hasBeenCompleted: false,
        },
      },
    }),
  };
}
