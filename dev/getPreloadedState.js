import { fromJS } from 'immutable';
import { MODULES } from '../constants/lessonConfig';

export default function getPreloadedState() {
  return {
    moduleProgress: fromJS({
      moduleId: MODULES.BASICS,
      stageIndex: 16,
      answers: {},
    }),
    overallProgress: fromJS({
      modules: {
        [MODULES.BASICS]: {
          highestCompletedStageIndex: 16,
          hasBeenCompleted: false,
        },
      },
    }),
  };
}
