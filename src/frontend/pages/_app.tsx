/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
*/

import './globals.css';
import type { AppProps } from 'next/app';
import setTheme from '../lib/setTheme';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import AppPageContainer from '../components/app/PageContainer';
import { useRouter } from 'next/router';
import UnderConstruction from '../components/app/UnderConstruction';

let hasEffectRun = false;

function NEXT_APP({ Component, pageProps }: AppProps) {
  // define _app state
  const [Errors, setErrors] = useState([] as any[]);
  const router = useRouter();
  const route = router.route;

  useEffect(() => {
    // if the effect is run more than once return
    if (hasEffectRun) return;
    // assign current theme mode (light | dark)
    // also listen for when the os default theme changes and react accordingly
    if (typeof window !== 'undefined') {
      if (!window.document.body.style.getPropertyValue('--devdash-setTheme'))
        setTheme();
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', () => {
          setTheme();
        });
    }
    // add listener for console errors and add them to the Errors state
    window.addEventListener('error', (e) => {
      if (window.location.hostname !== 'localhost') {
        e.preventDefault();
        setErrors([...Errors, e]);
      }
    });
    hasEffectRun = true;
  });

  // @ts-ignore
  if (Component?.ignoreTemplate) return <Component {...pageProps} />;

  switch (true) {
    case route.startsWith('/app/'):
      if (typeof window !== 'undefined')
        // @ts-ignore
        if (Component?.underConstruction && window.location.port !== '3000')
          // @ts-ignore
          return <UnderConstruction />;
      let pageId = route.split('/')[2];
      console.log(
        '%c[TemplateRouter]%c pageId: ' + pageId,
        'color: green;',
        ''
      );

      

      return (
        <AppPageContainer pageId={pageId}>
          <Head>
            <title>DevDash | App</title>
          </Head>
          <Component {...pageProps} />
          <>
            {/* @ts-ignore */}
            {Component.underConstruction ? (
              <div className='fixed top-1/2 -translate-y-1/2 -left-1 border-r-0 rounded-r-none [writing-mode:vertical-lr;] rotate-180 border-2 border-yellow-500 pt-2 pb-2 pl-2 pr-2 rounded-xl bg-content-dark text-text-primary pointer-events-none bg-opacity-50 z-50 backdrop-blur-md'>
                Under Construction
              </div>
            ) : null}
          </>
        </AppPageContainer>
      );
    default:
      return <Component {...pageProps} />;
  }
}

// return (<React.StrictMode>
//     <Head>
//         <link
//             rel="shortcut icon"
//             href={require("./../assets/icons/DevDash.svg").default.src}
//             type="image/x-icon"
//         />
//     </Head>
//     <div
//         className={`fixed z-50 bottom-4 right-4 text-xl pl-2 pr-2 bg-content-light text-text-secondary rounded-xl pointer-events-none border-2 border-branding-primary text-center`}>DevDash Pre-Alpha
//     </div>
//     <div
//         className={`w-max h-max fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-content-dark shadow-2xl rounded-2xl ${Errors.length > 0 ? "p-5" : "hidden"} text-red-500 font-extrabold max-h-[90vh] max-w-[90vw] overflow-scroll m-2`}>
//         {Errors.length > 0 ?
//             <button className={`cursor-pointer bg-content-light text-text-primary rounded-md`} onClick={() => {
//                 setErrors([]);
//             }}>Dismiss</button>
//             : null}
//         {Errors.map((e, i) => {
//             return <span key={i}>{e.message}</span>
//         })}
//     </div>
//     <Component {...pageProps} />
// </React.StrictMode>);

export default NEXT_APP;
