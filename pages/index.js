import React from 'react';
import Head from 'next/head';
import LearnRegexApp from '../components/LearnRegexApp';
import '../lib/firebase';

function App() {
  return (
    <div className="App">
      <Head>
        <title>Learn Regex</title>
      </Head>
      <LearnRegexApp />
    </div>
  );
}

export default App;
