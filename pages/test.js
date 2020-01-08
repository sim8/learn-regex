import React from "react";
import Head from "next/head";
import Nav from "../components/Nav";
import Stage from "../components/Stage";

function TestPrompt() {
  return (
    <div className="App">
      <Head>
        <title>Learn Regex // Test</title>
      </Head>
      <b>This is a test</b>
      <Nav />
    </div>
  );
}

export default TestPrompt;
