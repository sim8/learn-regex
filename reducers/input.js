import { fromJS } from 'immutable';
import {
  ENTER_CHARACTER,
  BACKSPACE,
  KEY_LEFT,
  KEY_RIGHT,
  MOVE_TO_NEXT_STAGE,
  MOVE_TO_PREVIOUS_STAGE,
  RETURN_TO_ALL_MODULES,
  COMPLETE_MODULE,
} from '../actions/actionTypes';

const initialState = fromJS({
  value: '',
  caretPos: 0,
});

export default function input(state = initialState, { altKey, ...action }) {
  const caretPos = state.get('caretPos');
  switch (action.type) {
    case RETURN_TO_ALL_MODULES:
    case COMPLETE_MODULE:
    case MOVE_TO_PREVIOUS_STAGE:
    case MOVE_TO_NEXT_STAGE:
      if (action.prefilledAnswer) {
        return initialState.merge({
          value: action.prefilledAnswer,
          caretPos: action.prefilledAnswer.length,
        });
      }
      return initialState;
    case ENTER_CHARACTER:
      return state
        .update(
          'value',
          value =>
            `${value.slice(0, caretPos)}${action.char}${value.slice(caretPos)}`
        )
        .set('caretPos', caretPos + 1);
    case BACKSPACE:
      return caretPos > 0
        ? state
            .update(
              'value',
              value => `${value.slice(0, caretPos - 1)}${value.slice(caretPos)}`
            )
            .set('caretPos', caretPos - 1)
        : state;
    case KEY_LEFT:
      return caretPos > 0 ? state.set('caretPos', caretPos - 1) : state;
    case KEY_RIGHT:
      return caretPos < state.get('value').length
        ? state.set('caretPos', caretPos + 1)
        : state;
    default:
      return state;
  }
}
