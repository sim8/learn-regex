import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import user from '@testing-library/user-event';

import { makeStore } from '../store';
import LearnRegexApp from '../components/LearnRegexApp';
import makeStoreWithTestOverrides from '../testUtils/makeStoreWithStateOverrides';

describe('Stage', () => {
  it('renders the first stage', () => {
    const store = makeStore();

    render(
      <Provider store={store}>
        <LearnRegexApp />
      </Provider>
    );

    expect(screen.getByText('Welcome to Learn Regex!')).toBeInTheDocument();
  });

  it('"Continue" and "Back" buttons work', () => {
    const store = makeStoreWithTestOverrides({
      moduleProgress: {
        stageIndex: 1,
      },
    });

    render(
      <Provider store={store}>
        <LearnRegexApp />
      </Provider>
    );

    expect(screen.getByText('And hello to you!')).toBeInTheDocument();
    user.click(screen.getByText('CONTINUE'));
    expect(screen.queryByText('And hello to you!')).toBeNull();
    expect(screen.queryByText('CONTINUE')).toBeNull();
    expect(
      screen.getByText('Which programming languages can regex be used in?')
    ).toBeInTheDocument();
    user.click(screen.getByText('BACK'));
    expect(screen.getByText('And hello to you!')).toBeInTheDocument();
  });
});
