import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import {
  MODULES,
  MODULES_CONFIG,
  STAGES,
  STAGE_CONFIG,
  STAGE_TYPES,
} from '../constants/lessonConfig';
import LearnRegexApp from './LearnRegexApp';
import makeStoreWithStateOverrides from '../testUtils/makeStoreWithStateOverrides';
import { keyPress } from '../slices/input';
import type { KeyboardEvent } from 'react';

const exercises = [
  [STAGES.ONE_OR_MORE, ['3', '12', '405']],
  [STAGES.ONE_OR_MORE_TEST, [' ', '   ', ' ', '     ', ' ']],
  [STAGES.OPTIONAL, ['color', 'colour']],
  [STAGES.OPTIONAL_TEST, ['duck', 'ducks']],
  [STAGES.ZERO_OR_MORE, ['ac', 'abc', 'abbc', 'abbbbbc']],
  [STAGES.EXACT_COUNT, ['8042']],
  [STAGES.COUNT_RANGE, ['beep', 'beeep', 'beeeep']],
  [STAGES.MINIMUM_COUNT, ['305', '8042', '12345']],
  [STAGES.QUANTIFIERS_CHALLENGE, ['R123!', 'R456.!', 'R007.!']],
] as const;

it.each(exercises)(
  '%s and its accepted alternatives match exactly the intended examples',
  (id, expected) => {
    const stage = STAGE_CONFIG[id];
    if (stage.type !== STAGE_TYPES.REGEX || !stage.searchBody)
      throw new Error('Expected a searchable regex exercise');
    for (const answer of [stage.answer, ...(stage.acceptedAnswers ?? [])]) {
      expect(
        Array.from(
          stage.searchBody.matchAll(new RegExp(answer, 'g')),
          (match) => match[0],
        ),
      ).toEqual(expected);
      const store = makeStoreWithStateOverrides({
        moduleProgress: {
          moduleId: MODULES.QUANTIFIERS,
          stageIndex: MODULES_CONFIG.QUANTIFIERS.stages.indexOf(id),
        },
      });
      for (const key of answer)
        store.dispatch(keyPress({ key } as KeyboardEvent<HTMLDivElement>));
      expect(
        store.getState().overallProgress.modules.QUANTIFIERS
          .highestCompletedStageIndex,
      ).toBe(MODULES_CONFIG.QUANTIFIERS.stages.indexOf(id));
    }
  },
);

it('lets a learner enter, finish, revisit and restart Quantifiers without carrying old input over', async () => {
  const user = userEvent.setup();
  const store = makeStoreWithStateOverrides({
    input: { value: 'leftover', caretPos: 8 },
  });
  render(
    <Provider store={store}>
      <LearnRegexApp />
    </Provider>,
  );
  await user.click(screen.getByText('ALL LESSONS'));
  await user.click(screen.getByText('Quantifiers'));
  expect(
    screen.getByText('Back for more? Excellent. So is regex.'),
  ).toBeInTheDocument();
  expect(store.getState().input.value).toBe('');
  await user.click(screen.getByRole('button', { name: 'CONTINUE' }));
  // Leave mid-lesson and resume before completing the module.
  await user.type(screen.getByRole('textbox'), 'x');
  expect(
    screen.queryByRole('button', { name: 'CONTINUE' }),
  ).not.toBeInTheDocument();
  await user.click(screen.getByText('ALL LESSONS'));
  await user.click(screen.getByText('Quantifiers'));
  await user.click(screen.getByRole('button', { name: 'Continue' }));
  expect(store.getState().moduleProgress.stageIndex).toBe(1);
  expect(store.getState().input.value).toBe('');

  for (const id of MODULES_CONFIG.QUANTIFIERS.stages.slice(1)) {
    const stage = STAGE_CONFIG[id];
    if (stage.type === STAGE_TYPES.REGEX) {
      expect(
        screen.queryByRole('button', { name: 'CONTINUE' }),
      ).not.toBeInTheDocument();
      await user.type(
        screen.getByRole('textbox'),
        stage.answer.replace(/[\[{]/g, '$&$&'),
      );
    } else if (stage.type === STAGE_TYPES.CHOICE) {
      // Exercise both the explanation for a wrong prediction and a correct prediction.
      await user.click(
        screen.getByRole('button', {
          name: stage.choices[
            id === STAGES.QUANTIFIER_CHOICE ? 0 : stage.answer
          ],
        }),
      );
      const feedback =
        id === STAGES.QUANTIFIER_CHOICE ? stage.failText! : stage.successText!;
      expect(screen.getByText(feedback[0])).toBeInTheDocument();
    }
    await user.click(screen.getByRole('button', { name: 'CONTINUE' }));
  }
  expect(screen.getByText('Congratulations!')).toBeInTheDocument();
  expect(
    store.getState().overallProgress.modules.QUANTIFIERS.hasEverBeenCompleted,
  ).toBe(true);
  await user.click(screen.getByRole('button', { name: 'CONTINUE' }));
  await user.click(screen.getByText('Quantifiers'));
  expect(
    screen.getByText('Back for more? Excellent. So is regex.'),
  ).toBeInTheDocument();
  await user.click(screen.getByText('ALL LESSONS'));
});
