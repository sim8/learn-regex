import { fromJS } from 'immutable';
import moduleProgress from '../moduleProgress';
import { MOVE_TO_NEXT_STAGE } from '../../actions/actionTypes';
import { MODULES } from '../../constants/lessonConfig';

describe('moduleProgress reducer', () => {
  it('updates the highestCompletedStageIndex', () => {
    const initialState = fromJS({
      moduleId: MODULES.BASICS,
      stageIndex: 0,
      highestCompletedStageIndex: -1,
    });
    const result = moduleProgress(initialState, { type: MOVE_TO_NEXT_STAGE });
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
    const result = moduleProgress(initialState, { type: MOVE_TO_NEXT_STAGE });
    expect(result.toJS()).toEqual({
      moduleId: MODULES.BASICS,
      stageIndex: 1,
      highestCompletedStageIndex: 1,
    });
  });
});
