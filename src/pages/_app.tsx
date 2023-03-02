import '../styles/globals.css';
import { Ubuntu_Mono } from '@next/font/google';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import store from '../store';

const ubuntuMono = Ubuntu_Mono({
  weight: '400',
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={`${ubuntuMono.className}`}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
