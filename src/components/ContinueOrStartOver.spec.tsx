import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import LearnRegexApp from './LearnRegexApp';
import { markStageAsComplete } from '../slices/overallProgress';
import makeStoreWithTestOverrides from '../testUtils/makeStoreWithStateOverrides';

jest.mock('../constants/lessonConfig', () => {
  const actual = jest.requireActual('../constants/lessonConfig');
  return {
    ...actual,
    MODULES_CONFIG: {
      ...actual.MODULES_CONFIG,
      BASICS: {
        ...actual.MODULES_CONFIG.BASICS,
        name: 'Test lesson',
        stages: ['GREETING', 'INTRO'],
      },
    },
    STAGE_CONFIG: {
      ...actual.STAGE_CONFIG,
      GREETING: { type: 'REGEX', text: ['First screen.'], answer: 'cat' },
      INTRO: { type: 'INFO', text: ['Next screen.'] },
    },
  };
});

describe('Module selection', () => {
  it.each([
    ['Continue', 1, 'Next screen.'],
    ['Start over', 0, 'First screen.'],
  ] as const)(
    '%s selects the appropriate stage and clears old input',
    async (action, index, text) => {
      const user = userEvent.setup();
      const store = makeStoreWithTestOverrides({
        moduleProgress: { stageIndex: 1 },
        input: { value: 'leftover', caretPos: 8 },
      });
      store.dispatch(
        markStageAsComplete({
          moduleId: 'BASICS',
          highestCompletedStageIndex: 0,
        }),
      );
      render(
        <Provider store={store}>
          <LearnRegexApp />
        </Provider>,
      );
      await user.click(screen.getByText('ALL LESSONS'));
      await user.click(screen.getByText('Test lesson'));
      expect(
        screen.getByText("You've completed 50% of", { exact: false }),
      ).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: action }));
      expect(screen.getByText(text)).toBeInTheDocument();
      expect(store.getState().moduleProgress.stageIndex).toBe(index);
      expect(store.getState().input).toEqual({ value: '', caretPos: 0 });
      if (action === 'Start over')
        expect(store.getState().overallProgress.modules.BASICS).toBeUndefined();
    },
  );

  it('clears old input when starting a fresh module', async () => {
    const user = userEvent.setup();
    const store = makeStoreWithTestOverrides({
      input: { value: 'leftover', caretPos: 8 },
    });
    render(
      <Provider store={store}>
        <LearnRegexApp />
      </Provider>,
    );
    await user.click(screen.getByText('ALL LESSONS'));
    await user.click(screen.getByText('Test lesson'));
    expect(screen.getByText('First screen.')).toBeInTheDocument();
    expect(store.getState().input).toEqual({ value: '', caretPos: 0 });
  });
});
