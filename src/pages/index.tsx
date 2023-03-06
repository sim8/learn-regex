import type { NextPage } from 'next';
import Head from 'next/head';
import LearnRegexApp from '../components/LearnRegexApp';
import Meta from '../components/Meta';

const IndexPage: NextPage = () => {
  return (
    <div className="App">
      <Head>
        <title>Learn Regex</title>
        <Meta />
      </Head>
      <LearnRegexApp />
    </div>
  );
};

export default IndexPage;
