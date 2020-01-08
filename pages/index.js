import React from "react";
import Head from "next/head";
import Nav from "../components/Nav";
import Stage from "../components/Stage";

function HomePage() {
  return (
    <div className="App">
      <Head>
        <title>Learn Regex</title>
      </Head>
      <Stage />
      <Nav />
    </div>
  );
}

export default HomePage;
