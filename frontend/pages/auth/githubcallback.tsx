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

import React from 'react';
import { NextRouter, withRouter } from 'next/router';
import Head from 'next/head';
import localForage from 'localforage';
import LoadingHourglass from '../../components/global/LoadingHourglass';

class Component extends React.Component<{ router: NextRouter }> {
  interval: number | undefined;
  iteration: number = 0;

  state: {
    failed: boolean;
    iteration: number;
  } = { failed: false, iteration: 0 };

  componentDidMount() {
    let authenticated = false;

    // fetch user from GitHub
    let windowQuery = new URLSearchParams(window.location.search);
    let githubToken = windowQuery.get('token');
    fetch(`https://api.github.com/user`, {
      headers: {
        Authorization: `token ${githubToken}`
      },
      method: 'GET'
    })
      .then((res) => {
        if (res.status === 200) {
          authenticated = true;
          return res.json();
        } else {
          this.setState({
            failed: true
          });
        }
      })
      .then((res) => {
        if (authenticated) {
          localForage.setItem('githubToken', githubToken);
          localForage.setItem('githubUser', res);
          this.props.router.replace('/app');
        } else {
          localForage.removeItem('githubToken');
          localForage.removeItem('githubUser');
          this.props.router.replace('/auth/login');
        }
      });
  }

  render() {
    return (
      <div
        className={`w-full h-screen bg-content-normal flex items-center justify-center flex-col`}
      >
        <Head>
          <title>DevDash - Authentication in progress...</title>
        </Head>
        <h1 className={`text-text-primary text-4xl max-w-[90%] text-center`}>
          {this.state.failed
            ? 'Authentication has failed.'
            : 'Authentication in progress...'}
        </h1>
        {this.state.failed ? (
          <>
            <h2 className={`text-2xl text-text-primary mt-4`}>
              <span className={`font-bold tracking-wider text-red-400`}>
                ERROR:{' '}
              </span>
              An issue has occurred
            </h2>
            <h2 className={`text-xl text-text-primary mt-20`}>
              Redirecting to home shortly
            </h2>
          </>
        ) : null}{' '}
        {!this.state.failed ? (
          <LoadingHourglass />
        ) : null}
      </div>
    );
  }
}

export default withRouter(Component);
