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

import { NextRouter, Router, withRouter } from "next/router";
import React from "react";
import Head from "next/head";
import localforage from "localforage";
import Icon from "../../components/global/Icon";

class Component extends React.Component<{ router: NextRouter }> {
  state: {
    token: string;
    activePage: string;
  } = {
      token: "",
      activePage: "default",
    };

  componentDidMount() {
    localforage.getItem("githubToken").then(token => {
      if (token) {
        this.props.router.push("/auth/githubcallback?token=" + token);
      }
    });
  }

  render() {
    return (
      <div
        className={`dark:bg-bg-dark-primary bg-bg-light-primary w-full h-screen overflow-hidden grid lg:grid-cols-[auto,1fr] grid-rows-[auto,1fr,auto] grid-cols-1 select-none`}>
        <Head>
          <title>DevDash - Login</title>
        </Head>
        <div
          className={`lg:w-72 w-full lg:h-screen h-20 bg-content-normal flex flex-col items-center justify-center shadow-lg`}>
          <div
            className={`flex lg:w-72 lg:fixed top-0 left-1 lg:left-0 h-20 cursor-pointer items-center lg:justify-center`}
            onClick={() => {
              this.props.router.push('/');
            }}>
            <Icon
              className={`h-14 aspect-square mr-2`}
              name='devdash'
              useDefaultColor
            />
            <h1
              className={`text-text-primary font-semibold tracking-widest text-2xl`}>
              DevDash
            </h1>
          </div>
        </div>
        <div className={`w-full h-full flex items-center justify-center`}>
          <div className='md:w-3/4 w-full h-3/4 bg-content-normal md:rounded-2xl relative flex flex-col items-center transition-all child:max-w-xl'>
            <h2 className='text-5xl text-text-secondary mt-10 mb-10'>Login</h2>
            <div className={'w-full h-full flex flex-col items-center'}>
              <button
                className='w-[calc(100%-2rem)] p-6 m-2 text-text-primary bg-content-normal border-2 rounded-xl border-content-border hover:bg-content-light active:bg-content-dark transition-all'
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    this.props.router.push(
                      `https://devdash.ewsgit.repl.co/auth/github?url=${
                        window.location.host ===
                        ('devdash.vercel.app' || 'ddsh.vercel.app')
                          ? 'https://devdash.vercel.app/auth/githubcallback'
                          : 'http://' +
                            window.location.hostname +
                            ':3000/auth/githubcallback'
                      }`
                    );
                  }
                }}>
                Login with Github
              </button>
              <button
                className={
                  'w-[calc(100%-1.5rem)] p-4 m-2 mt-auto text-text-primary bg-content-normal border-2 rounded-xl border-content-border hover:bg-content-light active:bg-content-dark transition-all'
                }
                onClick={() => {
                  this.props.router.push('/');
                }}>
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Component);