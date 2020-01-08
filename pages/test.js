import React from "react";
import Head from "next/head";
import Nav from "../components/Nav";
import PatternQuestion from "../components/questions/PatternQuestion";
import FullScreenFlexBox from "../components/styled/FullScreenFlexBox";

const initialSearchText = `
Welcome to the learn-regex tester!
Paste in any text you'd like here to test.
`;

function TestingPage() {
  return (
    <div className="App">
      <Head>
        <title>Learn Regex // Test</title>
      </Head>
      <FullScreenFlexBox>
        <div className="main-text">
          <textarea>
            Welcome to the learn-regex tester! Paste code here to test it below.
          </textarea>
        </div>
        <PatternQuestion searchBody={initialSearchText} />
        <div> button</div>
      </FullScreenFlexBox>
      <Nav />
    </div>
  );
}

export default TestingPage;
