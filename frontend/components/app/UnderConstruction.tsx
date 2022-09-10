/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React from 'react';
import Head from 'next/head';

export default function UnderConstruction() {
  return (
    <>
      <Head>
        <title>DevDash | Under Construction</title>
      </Head>
      <div
        className={`[background-image:repeating-linear-gradient(45deg,rgb(220,190,0)_0px,rgb(0,0,0)_50px);] w-full min-h-screen flex items-center justify-center flex-col relative select-none`}>
        <h1
          className={`text-center text-white text-6xl drop-shadow-[0.25rem_0.25rem_0_#000] z-10 mb-2`}>
          Under Construction
        </h1>
        <h2
          className={`text-center text-white text-2xl bg-content-normal p-2 rounded-md z-10 shadow-2xl`}>
          The current page is coming soon...
        </h2>
        <div className='w-full h-full bg-slate-600 bg-opacity-60 absolute top-0 left-0'></div>
      </div>
    </>
  );
}
