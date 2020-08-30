import { fromJS } from 'immutable';
import { COMPLETE_MODULE } from '../actions/actionTypes';

const initialState = fromJS({
  completedModules: {},
});

export default function overallProgress(state = initialState, { ...action }) {
  switch (action.type) {
    case COMPLETE_MODULE:
      return initialState.setIn(['completedModules', action.moduleId], true);
    default:
      return state;
  }
}
