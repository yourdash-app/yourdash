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

import * as React from "react";
import { NextRouter, withRouter } from "next/router";

class FourZeroFour extends React.Component<{ router: NextRouter }> {
  state: {
    time: number;
    interval: number;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      time: 8,
      interval: 0,
    };
  }

  componentDidMount(): void {
    this.setState({
      interval: setInterval(() => {
        if (this.state.time > 0) {
          this.setState({
            time: this.state.time - 1,
          });
        } else {
          clearInterval(this.state.interval);
          this.props.router.push("/");
          this.props.router.reload();
        }
      }, 1000),
    });
  }

  componentWillUnmount(): void {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <div className="bg-content-normal transition-colors w-full h-screen flex items-center justify-center flex-col">
        <div
          className={`fixed top-0 left-0 w-full h-20 bg-content-dark bg-opacity-30 flex items-center justify-center`}>
          <img className={`h-16`} src={require("./../assets/icons/DevDash.svg").default.src} alt="devdash icon" />
          <h2 className={`text-text-primary font-semibold tracking-widest text-2xl`}>DevDash</h2>
        </div>
        <h1 className="text-9xl text-text-primary">404</h1>
        <p className="text-4xl text-text-primary">Page not found</p>
        <button
          className={`p-3 bg-content-dark text-text-primary text-lg rounded-lg mt-5 pl-10 pr-10 hover:bg-content-light transition-all shadow-md active:bg-content-dark hover:shadow-lg active:shadow-inner`}
          onClick={() => {
            window.history.back();
          }}>
          Go back?
        </button>
        <div
          className={`fixed bottom-0 left-0 w-full h-14 bg-content-dark bg-opacity-30 flex items-center justify-center`}>
          <p className={`text-text-primary text-xl`}>Redirecting you to the home page in {this.state.time} seconds</p>
        </div>
      </div>
    );
  }
}

export default withRouter(FourZeroFour);
