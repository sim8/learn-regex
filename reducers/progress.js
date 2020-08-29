import { fromJS } from 'immutable';
import {
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE,
  STAGE_COMPLETE,
  SUBMIT_ANSWER,
  COMPLETE_MODULE,
  RETURN_TO_ALL_MODULES,
} from '../actions/actionTypes';
import { MODULES } from '../constants/lessonConfig';

const initialState = fromJS({
  moduleId: MODULES.BASICS,
  stageIndex: 0,
  highestCompletedStageIndex: -1,
  answers: {},
  moduleComplete: false,
});

const markStageCompleted = state =>
  state.update('highestCompletedStageIndex', highest =>
    Math.max(state.get('stageIndex'), highest)
  );

export default function progress(state = initialState, { ...action }) {
  switch (action.type) {
    case MOVE_TO_NEXT_STAGE: {
      return markStageCompleted(state).update('stageIndex', i => i + 1);
    }
    case MOVE_TO_PREVIOUS_STAGE:
      return state.update('stageIndex', i => i - 1);
    case STAGE_COMPLETE:
      return markStageCompleted(state);
    case SUBMIT_ANSWER:
      return markStageCompleted(state).setIn(
        ['answers', action.stage],
        action.answer
      );
    case COMPLETE_MODULE:
      return markStageCompleted(state).set('moduleComplete', true);
    case RETURN_TO_ALL_MODULES:
      return initialState.set('moduleId', null);
    default:
      return state;
  }
}
