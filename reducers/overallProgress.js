import { fromJS } from 'immutable';
import {
  COMPLETE_MODULE,
  MARK_STAGE_AS_COMPLETE,
} from '../actions/actionTypes';

const initialState = fromJS({
  modules: {},
});

export default function overallProgress(state = initialState, { ...action }) {
  switch (action.type) {
    case MARK_STAGE_AS_COMPLETE:
      return state.setIn(
        ['modules', action.moduleId, 'highestCompletedStageIndex'],
        action.highestCompletedStageIndex
      );
    case COMPLETE_MODULE:
      return state.setIn(
        ['modules', action.moduleId, 'hasBeenCompleted'],
        true
      );
    default:
      return state;
  }
}
