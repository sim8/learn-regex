import '../styles/globals.css';
import { Ubuntu_Mono } from '@next/font/google';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import store from '../store';
import { pageview } from '../lib/gtag';
import Head from 'next/head';
import { GA_TRACKING_ID } from '../constants/trackingConstants';
import Script from 'next/script';

const ubuntuMono = Ubuntu_Mono({
  weight: '400',
  subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      {/* Google tag (gtag.js) */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Provider store={store}>
        <main className={`${ubuntuMono.className}`}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  );
}
