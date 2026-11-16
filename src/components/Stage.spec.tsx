import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { makeStore } from '../store';
import LearnRegexApp from './LearnRegexApp';
import makeStoreWithTestOverrides from '../testUtils/makeStoreWithStateOverrides';

// A small synthetic module exercises the framework independently of lesson copy,
// exercise counts, and the patterns taught by any particular lesson.
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
      GREETING: {
        type: 'REGEX',
        text: ['Find the animal.'],
        searchBody: 'cat dog',
        answer: 'cat',
        acceptedAnswers: ['(?:cat)'],
        successText: ['Pattern accepted.'],
      },
      INTRO: {
        type: 'CHOICE',
        text: ['Choose an answer.'],
        choices: ['Correct', 'Incorrect'],
        answer: 0,
        successText: ['Correct explanation.'],
        failText: ['Incorrect explanation.'],
      },
    },
  };
});

function renderApp(store = makeStore()) {
  render(
    <Provider store={store}>
      <LearnRegexApp />
    </Provider>,
  );
  return store;
}

describe('Stage framework', () => {
  it.each(['cat', '(?:cat)'])(
    'accepts a configured answer (%s) and advances with Enter',
    async (answer) => {
      const user = userEvent.setup();
      const store = renderApp();
      expect(
        screen.queryByRole('button', { name: 'CONTINUE' }),
      ).not.toBeInTheDocument();
      await user.type(screen.getByRole('textbox'), answer);
      expect(screen.getByText('Pattern accepted.')).toBeInTheDocument();
      expect(
        store.getState().overallProgress.modules.BASICS
          .highestCompletedStageIndex,
      ).toBe(0);
      await user.keyboard('{Enter}');
      expect(screen.getByText('Choose an answer.')).toBeInTheDocument();
      expect(store.getState().input.value).toBe('');
    },
  );

  it('uses a native input and validates pasted text and selection edits', async () => {
    const user = userEvent.setup();
    const store = renderApp();
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input).not.toHaveFocus();
    await user.click(input);
    await user.paste('cart');
    expect(store.getState().input.value).toBe('cart');
    input.setSelectionRange(2, 3);
    await user.keyboard('{Delete}');
    expect(input).toHaveValue('cat');
    expect(screen.getByText('Pattern accepted.')).toBeInTheDocument();
    await user.keyboard('{Enter}');
    expect(screen.getByText('Choose an answer.')).toBeInTheDocument();
  });

  it('validates mobile change events without keypresses and ignores composing Enter', () => {
    renderApp();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '*' } });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    fireEvent.change(input, { target: { value: 'cat' } });
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(screen.getByText('Pattern accepted.')).toBeInTheDocument();
    expect(fireEvent.keyDown(input, { key: 'Enter', isComposing: true })).toBe(
      false,
    );
    expect(screen.getByText('Find the animal.')).toBeInTheDocument();
    fireEvent.submit(input.closest('form')!);
    expect(screen.getByText('Choose an answer.')).toBeInTheDocument();
  });

  it('keeps an incorrect pattern from advancing', async () => {
    const user = userEvent.setup();
    const store = renderApp();
    await user.type(screen.getByRole('textbox'), 'dog{Enter}');
    expect(screen.getByText('Find the animal.')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'CONTINUE' }),
    ).not.toBeInTheDocument();
    expect(store.getState().overallProgress.modules.BASICS).toBeUndefined();
  });

  it('supports forward/back navigation and clears the previous input', async () => {
    const user = userEvent.setup();
    const store = renderApp();
    await user.type(screen.getByRole('textbox'), 'cat');
    await user.click(screen.getByRole('button', { name: 'CONTINUE' }));
    await user.click(screen.getByRole('button', { name: 'BACK' }));
    expect(screen.getByText('Find the animal.')).toBeInTheDocument();
    expect(store.getState().input.value).toBe('');
  });

  it.each([
    ['Correct', 'Correct explanation.'],
    ['Incorrect', 'Incorrect explanation.'],
  ])(
    'shows feedback for %s and completes the final stage',
    async (answer, feedback) => {
      const user = userEvent.setup();
      const store = renderApp(
        makeStoreWithTestOverrides({ moduleProgress: { stageIndex: 1 } }),
      );
      expect(
        screen.queryByRole('button', { name: 'CONTINUE' }),
      ).not.toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: answer }));
      expect(screen.getByText(feedback)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Correct' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Incorrect' })).toBeDisabled();
      await user.click(screen.getByRole('button', { name: 'CONTINUE' }));
      expect(screen.getByText('Congratulations!')).toBeInTheDocument();
      expect(
        store.getState().overallProgress.modules.BASICS.hasEverBeenCompleted,
      ).toBe(true);
      await user.click(screen.getByRole('button', { name: 'CONTINUE' }));
      await user.click(screen.getByText('Test lesson'));
      expect(screen.getByText('Find the animal.')).toBeInTheDocument();
    },
  );
});
