import { fromJS } from 'immutable';
import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE,
  SUBMIT_ANSWER,
  RETURN_TO_ALL_MODULES,
  START_MODULE,
} from '../actions/actionTypes';
import { MODULES } from '../constants/lessonConfig';

const initialState = fromJS({
  moduleId: MODULES.BASICS,
  stageIndex: 0,
  answers: {},
});

export default function moduleProgress(state = initialState, { ...action }) {
  switch (action.type) {
    case MOVE_TO_NEXT_STAGE: {
      return state.update('stageIndex', i => i + 1);
    }
    case MOVE_TO_PREVIOUS_STAGE:
      return state.update('stageIndex', i => i - 1);
    case SUBMIT_ANSWER:
      return state.setIn(['answers', action.stage], action.answer);
    case RETURN_TO_ALL_MODULES:
      return initialState.set('moduleId', null);
    case START_MODULE:
      return initialState.set('moduleId', action.moduleId);
    default:
      return state;
  }
}
