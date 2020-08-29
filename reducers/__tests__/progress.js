import { fromJS } from 'immutable';
import progress from '../progress';
import { MOVE_TO_NEXT_STAGE } from '../../actions/actionTypes';
import { MODULES } from '../../constants/lessonConfig';

describe('progress reducer', () => {
  it('updates the highestCompletedStageIndex', () => {
    const initialState = fromJS({
      moduleId: MODULES.BASICS,
      stageIndex: 0,
      highestCompletedStageIndex: -1,
    });
    const result = progress(initialState, { type: MOVE_TO_NEXT_STAGE });
    expect(result.toJS()).toEqual({
      moduleId: MODULES.BASICS,
      stageIndex: 1,
      highestCompletedStageIndex: 0,
    });
  });

  it('does not update the highestCompletedStageIndex if not surpassed', () => {
    const initialState = fromJS({
      moduleId: MODULES.BASICS,
      stageIndex: 0,
      highestCompletedStageIndex: 1,
    });
    const result = progress(initialState, { type: MOVE_TO_NEXT_STAGE });
    expect(result.toJS()).toEqual({
      moduleId: MODULES.BASICS,
      stageIndex: 1,
      highestCompletedStageIndex: 1,
    });
  });
});
