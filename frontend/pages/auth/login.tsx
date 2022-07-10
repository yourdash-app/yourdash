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

import {NextRouter, withRouter} from "next/router";
import React from "react";
import Head from "next/head";
import localforage from "localforage";
import {IconTypings} from "../../lib/materialIconTypings";

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
        className={`dark:bg-bg-dark-primary bg-bg-light-primary w-full h-screen overflow-hidden grid md:grid-cols-[auto_1fr] md:grid-rows-1 grid-rows-[auto_1fr_auto] grid-cols-1 select-none`}>
        <Head>
          <title>DevDash - Login</title>
        </Head>
        <div
          className={`md:w-80 w-full md:h-screen h-20 bg-content-normal flex flex-col items-center justify-center shadow-lg`}>
          <div
            className={`flex md:w-80 md:fixed top-0 left-1 md:left-0 h-20 cursor-pointer items-center md:justify-center`}
            onClick={() => {
              this.props.router.push("/");
            }}>
            <img
              className={`h-16`}
              src={require("./../../assets/icons/DevDash.svg").default.src}
              alt=""
              draggable="false"
            />
            <h1 className={`text-text-primary font-semibold tracking-widest text-2xl`}>DevDash</h1>
          </div>
          <div className={`w-full h-full md:flex hidden flex-col items-center justify-center`}>
            <LoginOptionButton
              icon="verified_user"
              name="Github Oauth"
              activePage={this.state.activePage}
              onClick={() => {
                if (typeof window !== "undefined") {
                  this.props.router.push(
                      `https://devdash.ewsgit.repl.co/auth/github?url=${
                          window.location.host === ("devdash.vercel.app" || "ddsh.vercel.app")
                              ? "https://devdash.vercel.app/auth/githubcallback"
                              : "http://" + window.location.hostname + ":3000/auth/githubcallback"
                      }`
                  );
                }
              }}
              setActivePage={(page: string) => {
                this.setState({activePage: page});
              }}
            />
          </div>
        </div>
        <div className={`w-auto h-full flex items-center justify-center`}>
          {this.state.activePage === "default" ? (
            <p
              className={`text-2xl text-text-secondary font-semibold tracking-wider p-4 shadow-2xl bg-content-normal rounded-xl`}>
              Please select a login method from the side of the page.
            </p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(Component);

function LoginOptionButton(props: {
  icon: IconTypings;
  name: string;
  activePage: string;
  onClick?: () => void;
  setActivePage?: (page: string) => void;
}) {
  return (
    <div
      className={`w-72 rounded-md pt-4 pb-4 flex items-center justify-center text-text-primary cursor-pointer hover:bg-content-light active:bg-content-dark active:shadow-inner transition-colors`}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        } else {
          // @ts-ignore
          props.setActivePage(props.name);
        }
      }}>
      {props.activePage === props.name ? <div className={`w-4 h-full bg-branding-primary`}></div> : null}
      <span className={`material-icons-round pr-2 text-4xl`}>{props.icon}</span>
      <p className="text-xl">{props.name}</p>
    </div>
  );
}
