import configureMockStore from 'redux-mock-store';
import { fromJS } from 'immutable';
import thunk from 'redux-thunk';
import { MODULES } from '../constants/lessonConfig';

const getMockStore = () => {
  const middlewares = [thunk];
  return configureMockStore(middlewares);
};

// eslint-disable-next-line import/prefer-default-export
export const getStore = ({
  moduleId = MODULES.BASICS,
  stageIndex = 3,
  answers = {},
  isComplete = false,
  overallProgress = {
    modules: {
      [MODULES.BASICS]: {
        highestCompletedStageIndex: 2,
        hasEverBeenCompleted: false,
      },
    },
  },
} = {}) =>
  getMockStore()({
    moduleProgress: fromJS({
      moduleId,
      stageIndex,
      answers,
      isComplete,
    }),
    overallProgress: fromJS(overallProgress),
  });
