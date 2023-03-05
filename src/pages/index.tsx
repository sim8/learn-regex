import type { NextPage } from 'next';
import Head from 'next/head';
import LearnRegexApp from '../components/LearnRegexApp';

const IndexPage: NextPage = () => {
  return (
    <div className="App">
      <Head>
        <title>Learn Regex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LearnRegexApp />
    </div>
  );
};

export default IndexPage;
