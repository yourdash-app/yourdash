/*
 * Copyright (c) 2022-2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { Card, MajorButton, Button } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { useTranslateHomePage } from "../../helpers/l10n";

const Index: React.FC = () => {
  const trans = useTranslateHomePage( "index" );
  const navigate = useNavigate();
  const [taglineInd, setTaglineInd] = useState( 0 );
  
  useEffect( () => {
    if ( taglineInd + 1 >= 3 ) {
      setTimeout( () => setTaglineInd( 0 ), 3000 );
    } else {
      setTimeout( () => setTaglineInd( taglineInd + 1 ), 3000 );
    }
  }, [taglineInd] );
  
  return (
    <main className={"bg-base-900 min-h-screen h-full overflow-y-auto overflow-x-hidden"}>
      <Header/>
      <section className={"w-full bg-container-bg p-3 flex items-center justify-center gap-1"}>
        {trans( "BANNER.MESSAGE.CONTENT" )}<Link className={"text-theme-300 hover:text-theme-400 active:text-theme-200"} to={"/docs/how-to-help"}>{trans( "BANNER.MESSAGE.CALL_TO_ACTION" )}</Link>
      </section>
      <section
        className={"animate__animated animate__fadeIn w-full h-[30rem] overflow-hidden relative bg-base-800 [clip-path:_polygon(0_0,_100%_0%,_100%_85%,_0%_100%);] grid md:grid-cols-2 grid-cols-1 gap-10 pb-4"}
      >
        <div className={"flex flex-col items-end justify-center overflow-hidden md:ml-0 md:mr-0 ml-auto mr-auto"}>
          <h1 className={"text-6xl font-bold text-base-50 animate__jackInTheBox animate__animated flex select-none"}>
            YourDash
          </h1>
          {/* Taglines scroller */}
          <div
            className={"relative whitespace-nowrap w-full animate__animated animate__slideInRight animate__500ms"}
          >
            <span
              className={"absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500"}
              style={{
                right: taglineInd === 0
                  ? 0
                  : "-100%",
                opacity: taglineInd === 0
                  ? 1
                  : 0
              }}
            >
              {trans( "TAGLINES.0" )}
            </span>
            <span
              className={"absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500"}
              style={{
                right: taglineInd === 1
                  ? 0
                  : "-100%",
                opacity: taglineInd === 1
                  ? 1
                  : 0
              }}
            >
              {trans( "TAGLINES.1" )}
            </span>
            <span
              className={"absolute flex items-end text-end transition-all motion-reduce:transition-none duration-500"}
              style={{
                right: taglineInd === 2
                  ? 0
                  : "-100%",
                opacity: taglineInd === 2
                  ? 1
                  : 0
              }}
            >
              {trans( "TAGLINES.2" )}
            </span>
          </div>
          <div
            className={"flex gap-4 pt-7 items-center justify-center animate__animated animate__fadeIn animate__750ms"}
          >
            <Link
              to={"/login"}
              className={"pl-4 pr-4 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full animate__animated animate__tada animate__1s"}
            >
              Login
            </Link>
            <Link
              to={"/login/signup"}
              className={"hover:text-theme-500 active:text-theme-400 text-theme-200 transition-colors select-none cursor-pointer"}
            >
              Signup
            </Link>
          </div>
        </div>
        <div className={"relative md:block hidden"}>
          <img
            className={"w-24 absolute top-36 left-56 aspect-square animate__animated animate__bounceInDown animate__1000ms hover:top-32 transition-[var(--transition)] shadow-2xl rounded-3xl"}
            src={"/assets/promo-apps/store.png"}
            alt={""}
          />
          <img
            className={"w-24 absolute top-44 left-36 aspect-square animate__animated animate__bounceInDown animate__750ms hover:top-40 transition-[var(--transition)] shadow-2xl rounded-3xl"}
            src={"/assets/promo-apps/code-studio.png"}
            alt={""}
          />
          <img
            className={"w-24 absolute top-36 left-16 aspect-square animate__animated animate__bounceInDown animate__500ms hover:top-32 transition-[var(--transition)] shadow-2xl rounded-3xl"}
            src={"/assets/promo-apps/checklist.png"}
            alt={""}
          />
          <img
            className={"w-24 absolute top-40 left-0 aspect-square animate__animated animate__bounceInDown animate__250ms hover:top-36 transition-[var(--transition)] shadow-2xl rounded-3xl"}
            src={"/assets/promo-apps/files.png"}
            alt={""}
          />
        </div>
      </section>
      <main className={"max-w-6xl ml-auto mr-auto"}>
        <section
          className={"lg:flex-row flex-col pt-8 flex lg:justify-between items-center gap-4 w-full pl-8 pr-8 mb-10"}
        >
          <h3 className={"text-7xl lg:text-left text-center font-black animate__animated animate__fadeInLeft animate__500ms animate__slow"}>
            {trans( "SECTIONS.HOST_YOUR_OWN.TITLE" )}
          </h3>
          <div className={"flex lg:items-end items-center gap-4 flex-col animate__animated animate__fadeInRight animate__500ms animate__slow relative"}>
            <span className={"lg:w-72 lg:text-right text-center text-2xl"}>
              {trans( "SECTIONS.HOST_YOUR_OWN.CONTENT" )}
              <span className={"text-base font-thin text-gray-300"}>
                *
              </span>
            </span>
            <MajorButton onClick={() => {
              navigate( "/docs/get-started" );
            }}
            >
              {trans( "SECTIONS.HOST_YOUR_OWN.ACTION" )}
            </MajorButton>
            <span className={"text-xs text-gray-400 absolute top-full mt-2"}>
              *{trans( "SECTIONS.HOST_YOUR_OWN.DISCLAIMER" )}
            </span>
          </div>
        </section>
        <section
          className={"lg:flex-row flex-col-reverse pt-8 flex lg:justify-between items-center gap-4 w-full pl-8 pr-8 mb-10"}
        >
          <div className={"flex lg:items-start items-center gap-4 flex-col animate__animated animate__fadeInLeft animate__1000ms animate__slow relative"}>
            <span className={"lg:w-72 lg:text-left text-center text-2xl"}>
              {trans( "SECTIONS.LIMITLESS_PERSONALISATION.CONTENT" )}
            </span>
            <Button onClick={() => {
              navigate( "/docs/get-started" );
            }}
            >
              {trans( "SECTIONS.LIMITLESS_PERSONALISATION.ACTION" )}
            </Button>
          </div>
          <h3 className={"text-7xl font-black lg:text-right text-center animate__animated animate__fadeInRight animate__1000ms animate__slow"}>
            {trans( "SECTIONS.LIMITLESS_PERSONALISATION.TITLE" )}
          </h3>
        </section>
        <section
          className={"lg:flex-row flex-col pt-8 flex lg:justify-between items-center gap-4 w-full pl-8 pr-8 mb-10"}
        >
          <h3 className={"text-7xl lg:text-left text-center font-black animate__animated animate__fadeInLeft animate__1500ms animate__slow"}>
            {trans( "SECTIONS.OPEN_SOURCED.TITLE" )}
          </h3>
          <div className={"flex lg:items-end items-center gap-4 flex-col animate__animated animate__fadeInRight animate__1500ms animate__slow relative"}>
            <span className={"lg:w-72 lg:text-right text-center text-2xl"}>
              {trans( "SECTIONS.OPEN_SOURCED.CONTENT" )}
            </span>
            <Button onClick={() => {
              navigate( "/docs/get-started" );
            }}
            >
              {trans( "SECTIONS.OPEN_SOURCED.ACTION" )}
            </Button>
          </div>
        </section>
      </main>
      <footer
        className={"w-full h-16 flex items-center gap-2 pl-3 bg-container-bg mt-16"}
      >
        <img
          src={"/assets/productLogos/yourdash.svg"}
          className={"h-full pt-3 pb-3"}
          alt={""}
        />
        <h3 className={"font-bold text-3xl"}>{"YourDash"}</h3>
        <p className={"ml-auto mr-auto"}>{"Copyright © 2022-2023 YourDash Contributors"}</p>
        <Button
          onClick={() => {
            navigate( "/" );
          }}
        >
          {"Home"}
        </Button>
        <Button
          className={"mr-2"}
          onClick={() => {
            navigate( "/docs" );
          }}
        >
          {"Docs"}
        </Button>
      </footer>
    </main>
  );
};

export default Index;
