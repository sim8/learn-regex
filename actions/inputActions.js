import { ENTER_CHARACTER, KEY_LEFT, KEY_RIGHT, BACKSPACE } from './actionTypes';
import { getInputValue } from '../selectors/inputSelectors';
import {
  getStageConfig,
  getCanMoveToNextStage,
} from '../selectors/moduleProgressSelectors';
import { moveToNextScreen, stageCompleteAction } from './moduleProgressActions';

export const keyPress = ({ key }) => (dispatch, getState) => {
  const state = getState();
  const stageConfig = getStageConfig(state);
  if (key === 'Enter') {
    if (getCanMoveToNextStage(state)) {
      dispatch(moveToNextScreen());
    }
    return;
  }
  dispatch({
    type: ENTER_CHARACTER,
    char: key,
  });
  const inputValue = getInputValue(getState());
  if (inputValue === stageConfig.answer) {
    dispatch(stageCompleteAction());
  }
};

export const keyDown = ({ key, altKey }) => dispatch => {
  switch (key) {
    case 'ArrowLeft':
      dispatch({
        type: KEY_LEFT,
        altKey,
      });
      break;
    case 'ArrowRight':
      dispatch({
        type: KEY_RIGHT,
        altKey,
      });
      break;
    case 'Backspace':
      dispatch({
        type: BACKSPACE,
        altKey,
      });
      break;
    default:
  }
};
