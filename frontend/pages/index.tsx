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
import NavBar from "../components/home/NavBar";
import Head from "next/head";
import Link from "next/link";
import { Router, withRouter } from "next/router";

class IndexPage extends React.Component<{ router: Router }> {
  state: {
    fullscreenPreview: boolean;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      fullscreenPreview: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("is_desktop") === "true") {
      this.props.router.push("/auth/login")
    }
  }

  render() {
    return (
      <div className="bg-bg-light-primary dark:bg-bg-dark-primary transition-colors w-full h-full scroll-smooth overflow-hidden">
        <Head>
          <title>DevDash - Home</title>
        </Head>
        <NavBar />
        <div className={`relative select-none`}>
          <img
            src={require("./../assets/homescreenWave.svg").default.src}
            className={`w-full max-h-screen min-h-[75vh] select-none`}
            alt="wave background"
            draggable={false}
          />
          <div className={`absolute top-0 pt-20 left-0 w-full h-full flex items-center justify-center`}>
            <div
              className={`sm:w-5/6 w-full sm:rounded-2xl overflow-hidden bg-content-light md:h-7/8 h-5/6 rounded-none shadow-2xl flex items-center justify-center transition-all`}>
              <img
                draggable={false}
                className="h-48 select-none"
                src={require("./../assets/FlatIcons/interface-file-alert-warning.svg").default.src}
                alt="Content Error"
              />
            </div>
          </div>
        </div>
        <div>

        </div>
        <div className={`w-full bg-content-dark bg-opacity-80 backdrop-blur shadow-inner`}>
          {/*  Page Content  */}

          {/* Why, How, SourceCode */}
          <div className={`w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-10 relative`}>
            <div className={`flex items-center flex-col`}>
              <img
                width={80}
                height={80}
                draggable={false}
                className={`h-20 select-none`}
                src={
                  // @ts-ignore
                  require("./../assets/FlatIcons/interface-help-question-chat-bubble-rectangle.svg").default.src
                }
                alt=""
              />
              <h1
                className={`tracking-wider w-full text-center relative text-xl text-text-primary pt-3 after:w-[70%] after:left-[15%] after:rounded-xl after:absolute after:-bottom-1 after:h-0.5 after:bg-branding-primary select-none`}>
                Why
              </h1>
              <p className={`text-center text-text-secondary pt-5`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nisi vitae quia sed eaque minus quidem odit
                molestiae, amet culpa blanditiis fugiat facilis veritatis error? Ipsam dolor vitae incidunt porro!
              </p>
            </div>
            <div className={`flex items-center flex-col`}>
              <img
                width={80}
                height={80}
                draggable={false}
                className={`h-20 select-none`}
                src={
                  // @ts-ignore
                  require("./../assets/FlatIcons/interface-dashboard-layout-2.svg").default.src
                }
                alt=""
              />
              <h1
                className={`tracking-wider w-full text-center relative text-xl text-text-primary pt-3 after:w-[70%] after:left-[15%] after:rounded-xl after:absolute after:-bottom-1 after:h-0.5 after:bg-branding-primary select-none`}>
                How
              </h1>
              <p className={`text-center text-text-secondary pt-5`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam enim et eveniet fuga molestias nam
                omnis quae voluptate! Distinctio dolorem et excepturi incidunt labore magni maiores mollitia,
                necessitatibus placeat praesentium provident ratione, voluptatum? Quibusdam, vero.
              </p>
            </div>
            <div className={`flex items-center flex-col sm:col-span-2 md:col-span-1`}>
              <img
                width={80}
                height={80}
                draggable={false}
                className={`h-20 select-none`}
                src={
                  // @ts-ignore
                  require("./../assets/FlatIcons/programming-browser-code.svg").default.src
                }
                alt=""
              />
              <h1
                className={`tracking-wider w-full text-center relative text-xl text-text-primary pt-3 after:w-[70%] after:left-[15%] after:rounded-xl after:absolute after:-bottom-1 after:h-0.5 after:bg-branding-primary select-none`}>
                Source Code
              </h1>
              <p className={`text-center text-text-secondary pt-5`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur ducimus quo sapiente tenetur
                voluptatum. Accusamus corporis cum, eaque fuga ipsa itaque neque nostrum obcaecati quod sint ullam ut
                vel veritatis.
              </p>
            </div>
          </div>
          {/* Languages - Built With */}
          <div className={`w-full flex flex-col items-center justify-center mt-20`}>
            <h1
              className={`text-4xl mb-10 text-text-primary relative after:w-full after:left-0 after:rounded-xl after:absolute after:-bottom-1 after:h-0.5 after:bg-branding-primary select-none`}>
              Built With
            </h1>
            <div
              className={`w-screen grid pb-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 m-10 select-none`}>
              <div className={`h-24 sm:h-40 group flex justify-center items-center relative z-0 hover:z-10`}>
                <img
                  className={`rounded-lg sm:rounded-2xl h-full group-hover:scale-150 group-hover:shadow-2xl shadow-inner transition-transform will-change-transform select-none`}
                  // @ts-ignore
                  src={require("./../assets/madeWith/JavaScript.svg").default.src}
                  draggable="false"
                  alt="javascript"></img>
                <p
                  className={`absolute top-full p-3 backdrop-blur-sm bg-opacity-90 translate-y-full rounded-2xl scale-0 group-hover:scale-100 transition-transform bg-content-dark text-text-primary text-lg m-0 origin-top will-change-transform`}>
                  Javascript
                </p>
              </div>

              <div className={`h-24 sm:h-40 group flex justify-center items-center relative z-0 hover:z-10`}>
                <img
                  className={`rounded-lg sm:rounded-2xl h-full group-hover:scale-150 group-hover:shadow-2xl shadow-inner transition-transform will-change-transform`}
                  // @ts-ignore
                  src={require("./../assets/madeWith/TypeScript.svg").default.src}
                  draggable="false"
                  alt="typescript"></img>
                <p
                  className={`absolute top-full p-3 backdrop-blur-sm bg-opacity-90 translate-y-full rounded-2xl scale-0 group-hover:scale-100 transition-transform bg-content-dark text-text-primary text-lg m-0 origin-top will-change-transform`}>
                  Typescript
                </p>
              </div>

              <div className={`h-24 sm:h-40 group flex justify-center items-center relative z-0 hover:z-10`}>
                <img
                  className={`rounded-lg sm:rounded-2xl h-full group-hover:scale-150 group-hover:shadow-2xl shadow-inner transition-transform will-change-transform`}
                  src={
                    // @ts-ignore
                    require("./../assets/madeWith/TypeScript-React.svg").default.src
                  }
                  draggable="false"
                  alt="typescript react"></img>
                <p
                  className={`absolute top-full p-3 backdrop-blur-sm bg-opacity-90 translate-y-full rounded-2xl scale-0 group-hover:scale-100 transition-transform bg-content-dark text-text-primary text-lg m-0 origin-top will-change-transform`}>
                  Typescript React
                </p>
              </div>

              <div className={`h-24 sm:h-40 group flex justify-center items-center relative z-0 hover:z-10`}>
                <img
                  className={`rounded-lg sm:rounded-2xl h-full group-hover:scale-150 group-hover:shadow-2xl shadow-inner transition-transform will-change-transform`}
                  src={
                    // @ts-ignore
                    require("./../assets/madeWith/JavaScript-React.svg").default.src
                  }
                  draggable="false"
                  alt="javascript react"></img>
                <p
                  className={`absolute top-full p-3 backdrop-blur-sm bg-opacity-90 translate-y-full rounded-2xl scale-0 group-hover:scale-100 transition-transform bg-content-dark text-text-primary text-lg m-0 origin-top will-change-transform`}>
                  Javascript React
                </p>
              </div>

              <div className={`h-24 sm:h-40 group flex justify-center items-center relative z-0 hover:z-10`}>
                <img
                  className={`rounded-lg sm:rounded-2xl h-full group-hover:scale-150 group-hover:shadow-2xl shadow-inner transition-transform will-change-transform`}
                  src={
                    // @ts-ignore
                    require("./../assets/madeWith/TailwindCss.svg").default.src
                  }
                  draggable="false"
                  alt="tailwindcss"></img>
                <p
                  className={`absolute top-full p-3 backdrop-blur-sm bg-opacity-90 translate-y-full rounded-2xl scale-0 group-hover:scale-100 transition-transform bg-content-dark text-text-primary text-lg m-0 origin-top will-change-transform`}>
                  Tailwind Css
                </p>
              </div>

              <div className={`h-24 sm:h-40 group flex justify-center items-center relative z-0 hover:z-10`}>
                <img
                  className={`rounded-lg sm:rounded-2xl h-full group-hover:scale-150 group-hover:shadow-2xl shadow-inner transition-transform will-change-transform`}
                  src={
                    // @ts-ignore
                    require("./../assets/madeWith/Github.svg").default.src
                  }
                  draggable="false"
                  alt="github api"></img>
                <p
                  className={`absolute top-full p-3 backdrop-blur-sm bg-opacity-90 translate-y-full rounded-2xl scale-0 group-hover:scale-100 transition-transform bg-content-dark text-text-primary text-lg m-0 origin-top will-change-transform`}>
                  Github Api
                </p>
              </div>
            </div>
          </div>
          <footer className="h-12 flex w-full items-center justify-center bg-dark bg-opacity-50 backdrop-blur-md">
            <p className="text-xl text-text-primary dark:alttextcolor">
              <span>
                <Link href="https://github.com/ewsgit/devdash">
                  <a className="hover:text-branding-hover transition-all relative before:absolute before:left-0 before:-bottom-0.5 before:h-0.5 before:scale-0 before:origin-left before:w-full before:bg-branding-hover before:hover:scale-100 before:transition-all">
                    The DevDash Project
                  </a>
                </Link>
                {" - By "}
                <Link href="https://github.com/ewsgit">
                  <a className="hover:text-branding-hover transition-all relative before:absolute before:left-0 before:-bottom-0.5 before:h-0.5 before:scale-0 before:origin-left before:w-full before:bg-branding-hover before:hover:scale-100 before:transition-all">
                    Ewsgit
                  </a>
                </Link>
              </span>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default withRouter(IndexPage)