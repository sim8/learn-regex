import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import LearnRegexApp from '../components/LearnRegexApp';
import makeStoreWithTestOverrides from '../testUtils/makeStoreWithStateOverrides';
import { MODULES } from '../constants/lessonConfig';

describe('ContinueOrStartOver', () => {
  it('"Continue" and "Start over" both work', async () => {
    const user = userEvent.setup();
    const store = makeStoreWithTestOverrides({
      moduleProgress: {
        stageIndex: 1,
      },
      overallProgress: {
        // @ts-expect-error no idea
        modules: {
          [MODULES.BASICS]: {
            highestCompletedStageIndex: 0,
            hasEverBeenCompleted: false,
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <LearnRegexApp />
      </Provider>,
    );

    await user.click(screen.getByText('ALL LESSONS'));
    await user.click(screen.getByText('Basics'));

    expect(
      screen.getByText("You've completed 5% of", { exact: false }),
    ).toBeInTheDocument();
    await user.click(screen.getByText('Continue'));
    expect(screen.getByText('And hello to you!')).toBeInTheDocument();

    await user.click(screen.getByText('ALL LESSONS'));
    await user.click(screen.getByText('Basics'));

    await user.click(screen.getByText('Start over'));

    expect(screen.getByText('Welcome to Learn Regex!')).toBeInTheDocument();
  });
});
