import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import { makeStore } from '../store';
import LearnRegexApp from '../components/LearnRegexApp';
import makeStoreWithTestOverrides from '../testUtils/makeStoreWithStateOverrides';

describe('Stage', () => {
  it('renders the first stage', () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <LearnRegexApp />
      </Provider>,
    );

    expect(screen.getByText('Welcome to Learn Regex!')).toBeInTheDocument();
  });

  it('accepts the greeting and advances with Enter', async () => {
    const user = userEvent.setup();
    const store = makeStore();

    render(
      <Provider store={store}>
        <LearnRegexApp />
      </Provider>,
    );

    await user.type(screen.getByRole('textbox'), 'hello{Enter}');

    expect(screen.getByText('And hello to you!')).toBeInTheDocument();
    expect(
      store.getState().overallProgress.modules.BASICS
        .highestCompletedStageIndex,
    ).toBe(0);
  });

  it('"Continue" and "Back" buttons work', async () => {
    const user = userEvent.setup();
    const store = makeStoreWithTestOverrides({
      moduleProgress: {
        stageIndex: 1,
      },
    });

    render(
      <Provider store={store}>
        <LearnRegexApp />
      </Provider>,
    );

    expect(screen.getByText('And hello to you!')).toBeInTheDocument();
    await user.click(screen.getByText('CONTINUE'));
    expect(screen.queryByText('And hello to you!')).toBeNull();
    expect(screen.queryByText('CONTINUE')).toBeNull();
    expect(
      screen.getByText('Which programming languages can regex be used in?'),
    ).toBeInTheDocument();
    await user.click(screen.getByText('BACK'));
    expect(screen.getByText('And hello to you!')).toBeInTheDocument();
  });
});
