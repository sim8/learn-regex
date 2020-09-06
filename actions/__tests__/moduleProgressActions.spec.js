import { getStore } from '../../testingUtils/getStore';
import { stageCompleteAction } from '../moduleProgressActions';

describe('moduleProgressActions', () => {
  describe('stageCompleteAction', () => {
    it('updates stage index if new index is higher', () => {
      const store = getStore();
      store.dispatch(
        stageCompleteAction({
          type: 'AFTER_ACTION',
        })
      );
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: 'MARK_STAGE_AS_COMPLETE',
          moduleId: 'BASICS',
          highestCompletedStageIndex: 3,
        },
        {
          type: 'AFTER_ACTION',
        },
      ]);
    });
    it('does not update stage index if new index is not higher', () => {
      const store = getStore({ stageIndex: 2 });
      store.dispatch(
        stageCompleteAction({
          type: 'AFTER_ACTION',
        })
      );
      const actions = store.getActions();
      expect(actions).toEqual([
        {
          type: 'MARK_STAGE_AS_COMPLETE',
          moduleId: 'BASICS',
          highestCompletedStageIndex: 2,
        },
        {
          type: 'AFTER_ACTION',
        },
      ]);
    });
  });
});
