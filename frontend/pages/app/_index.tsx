import React from "react";
import Head from "next/head";

export default class Component extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>DevDash | App</title>
        </Head>
        <div
          className={`w-full bg-gray-400 grid grid-cols-1 sm:grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr] lg:grid-cols-[1fr,1fr,1fr,1fr] p-2 gap-2`}>
          <div className={`bg-content-dark flex items-center justify-center rounded-lg text-text-primary`}>
            This is a test
          </div>
          <div className={`bg-content-dark flex items-center justify-center rounded-lg text-text-primary`}>
            This is a test
          </div>
          <div className={`bg-content-dark flex items-center justify-center rounded-lg text-text-primary`}>
            This is a test
          </div>
        </div>
      </>
    );
  }
}
