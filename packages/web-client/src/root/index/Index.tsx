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
import { Link, useNavigate } from "react-router-dom";
import { useTranslateHomePage } from "web-client/src/helpers/i10n";
import { Button, MajorButton } from "../../ui";
import Header from "./components/Header";
import IndexPageHero from "./components/Hero/Hero";

const Index: React.FC = () => {
  const trans = useTranslateHomePage( "index" );
  const navigate = useNavigate();
  
  return ( <main className={ "bg-base-900 min-h-screen h-full overflow-y-auto overflow-x-hidden" }>
    <Header />
    <section className={ "w-full bg-container-bg p-3 flex items-center justify-center gap-1 animate__animated" +
                         " animate__fadeInDown" }>
      { trans( "BANNER.MESSAGE.CONTENT" ) }
      <Link
        className={"text-theme-300 hover:text-theme-400 active:text-theme-200"}
        to={ "/docs/how-to-help" }
      >
        { trans( "BANNER.MESSAGE.CALL_TO_ACTION" ) }
      </Link>
    </section>
    <IndexPageHero />
    <main className={ "max-w-6xl ml-auto mr-auto" }>
      <section
        className={ "lg:flex-row flex-col pt-8 flex lg:justify-between items-center gap-4 w-full pl-8 pr-8 mb-10" }
      >
        <h3 className={ "text-7xl lg:text-left text-center font-black animate__animated animate__fadeInLeft animate__500ms animate__slow" }>
          { trans( "SECTIONS.HOST_YOUR_OWN.TITLE" ) }
        </h3>
        <div className={ "flex lg:items-end items-center gap-4 flex-col animate__animated animate__fadeInRight animate__500ms animate__slow relative" }>
          <span className={ "lg:w-72 lg:text-right text-center text-2xl" }>
            { trans( "SECTIONS.HOST_YOUR_OWN.CONTENT" ) }
            <span className={ "text-base font-thin text-gray-300" }>
                *
            </span>
          </span>
          <MajorButton onClick={ () => {
            navigate( "/docs/get-started" );
          } }
          >
            { trans( "SECTIONS.HOST_YOUR_OWN.ACTION" ) }
          </MajorButton>
          <span className={ "text-xs text-gray-400 absolute top-full mt-2" }>
              *{ trans( "SECTIONS.HOST_YOUR_OWN.DISCLAIMER" ) }
          </span>
        </div>
      </section>
      <section
        className={ "lg:flex-row flex-col-reverse pt-8 flex lg:justify-between items-center gap-4 w-full pl-8 pr-8 mb-10" }
      >
        <div className={ "flex lg:items-start items-center gap-4 flex-col animate__animated animate__fadeInLeft animate__1000ms animate__slow relative" }>
          <span className={ "lg:w-72 lg:text-left text-center text-2xl" }>
            { trans( "SECTIONS.LIMITLESS_PERSONALISATION.CONTENT" ) }
          </span>
          <Button onClick={ () => {
            navigate( "/docs/get-started" );
          } }
          >
            { trans( "SECTIONS.LIMITLESS_PERSONALISATION.ACTION" ) }
          </Button>
        </div>
        <h3 className={ "text-7xl font-black lg:text-right text-center animate__animated animate__fadeInRight animate__1000ms animate__slow" }>
          { trans( "SECTIONS.LIMITLESS_PERSONALISATION.TITLE" ) }
        </h3>
      </section>
      <section className={ "lg:flex-row flex-col pt-8 flex lg:justify-between items-center gap-4 w-full pl-8 pr-8 mb-10" }>
        <h3 className={ "text-7xl lg:text-left text-center font-black animate__animated animate__fadeInLeft animate__1500ms animate__slow" }>
          { trans( "SECTIONS.OPEN_SOURCED.TITLE" ) }
        </h3>
        <div className={ "flex lg:items-end items-center gap-4 flex-col animate__animated animate__fadeInRight animate__1500ms animate__slow relative" }>
          <span className={ "lg:w-72 lg:text-right text-center text-2xl" }>
            { trans( "SECTIONS.OPEN_SOURCED.CONTENT" ) }
          </span>
          <Button onClick={ () => {
            navigate( "/docs/get-started" );
          } }
          >
            { trans( "SECTIONS.OPEN_SOURCED.ACTION" ) }
          </Button>
        </div>
      </section>
    </main>
  </main> );
};

export default Index;
