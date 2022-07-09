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

class Component extends React.Component<{ router: NextRouter }> {
  state: {
    navButtons: {
      name: string;
      path?: string;
      cn?: string;
    }[];
    compactMenu: boolean;
  };
  constructor(props: any) {
    super(props);
    this.state = {
      navButtons: [
        {
          name: "Home",
          path: "/",
        },
        {
          name: "Github",
          path: "https://github.com/ewsgit/devdash",
          cn: "md:block hidden",
        },
        {
          name: "Projects",
          path: "/projects",
          cn: "md:block hidden",
        },
        {
          name: "Login",
          path: "/auth/login",
        },
        {
          name: "Ewsgit",
          path: "https://github.com/ewsgit",
          cn: "hidden",
        },
      ],
      compactMenu: false,
    };
  }
  render() {
    return (
      <>
        <div
          className={`select-none transition-all bg-content-normal h-20 bg-opacity-80 w-full fixed top-0 left-0 z-20 flex items-center justify-center backdrop-blur-md ${
            this.state.compactMenu === false ? "shadow-xl" : null
          }`}>
          <img
            width={64}
            height={64}
            className="h-16 cursor-pointer"
            // @ts-ignore
            src={require("./../../assets/icons/DevDash.svg").default.src}
            alt="devdash icon"
            onClick={() => {
              this.props.router.push("/");
            }}
            draggable="false"
          />
          <h2
            className="text-text-primary font-semibold tracking-widest text-2xl sm:mr-32 md:mr-48 mr-8 cursor-pointer transition-all"
            onClick={() => {
              this.props.router.push("/");
            }}>
            DevDash
          </h2>

          <div className={`flex items-center justify-center`}>
            {this.state.navButtons.map((button: any, index) => {
              return (
                <div className={`relative mr-2 ${button.cn}`} key={index}>
                  <p
                    className="text-text-primary cursor-pointer text-lg after:-bottom-2 after:rounded-md after:transition-all after:absolute after:w-full after:h-1 after:left-0 after:scale-0 hover:after:scale-100 font-medium after:bg-branding-primary hover:bg-content-light active:bg-content-dark transition-colors rounded-md pl-2 pr-2"
                    tabIndex={0}
                    onClick={() => {
                      this.props.router.push(button.path);
                    }}>
                    {button.name}
                  </p>
                </div>
              );
            })}
            <img
              aria-label="Ewsgit"
              src={require("./../../assets/ewsgit_plain.svg").default.src}
              alt="Ewsgit"
              onClick={() => {
                this.props.router.push("https://ewsgit.github.io");
              }}
              className={`aspect-square h-6 grayscale hover:grayscale-0 transition-all cursor-pointer hidden md:block`}
            />
          </div>
          <div className={`block relative md:hidden`}>
            <img
              src={require("./../../assets/FlatIcons/interface-setting-menu-burger.svg").default.src}
              tabIndex={0}
              width={24}
              height={24}
              className={`h-6 cursor-pointer`}
              alt="navigation links menu"
              onClick={() => {
                this.setState({
                  compactMenu: !this.state.compactMenu,
                });
              }}
            />
          </div>
        </div>
        <div
          className={`fixed left-0 z-10 h-max w-full duration-200 ease-in-out bg-content-normal border-b-2 border-branding-primary transition-all shadow-2xl grid grid-cols-5 gap-2 p-2 pt-20 md:hidden`}
          style={{
            top: this.state.compactMenu === true ? "0" : "-100%",
          }}>
          {this.state.navButtons.map((button: any, index) => {
            if (button.cn) {
              if (button.cn.includes("hidden")) {
                return (
                  <div key={index} className={`text-center relative mb-2`}>
                    <p
                      className="text-text-primary cursor-pointer text-lg after:-bottom-2 after:rounded-md after:transition-all after:absolute after:w-full after:h-1 after:left-0 after:scale-0 hover:after:scale-100 font-medium after:bg-branding-primary hover:bg-content-light active:bg-content-dark transition-colors rounded-md pl-2 pr-2"
                      tabIndex={0}
                      onClick={() => {
                        window.location.href = button.path;
                      }}>
                      {button.name}
                    </p>
                  </div>
                );
              } else {
                return null;
              }
            } else {
              return null;
            }
          })}
        </div>
      </>
    );
  }
}

export default withRouter(Component);
