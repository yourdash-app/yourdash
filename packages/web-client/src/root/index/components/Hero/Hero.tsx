/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
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
import { useNavigate } from "react-router";
import { useTranslateHomePage } from "../../../../helpers/i10n";
import { Link } from "react-router-dom";
import FloatingApplications from "./FloatingApplications/FloatingApplications";
import IndexPageHeroTaglines from "./Taglines";

const IndexPageHero: React.FC = () => {
  return <section
    className={ "animate__animated animate__fadeIn w-full h-[30rem] overflow-hidden relative bg-base-800 [clip-path:_polygon(0_0,_100%_0%,_100%_85%,_0%_100%);] grid md:grid-cols-2 grid-cols-1 gap-10 pb-4" }
  >
    <div
      className={ "flex flex-col items-end justify-center overflow-hidden md:ml-0 md:mr-0 ml-auto mr-auto" }
    >
      <h1
        className={ "text-6xl font-bold text-base-50 animate__jackInTheBox animate__animated flex select-none" }
      >
        YourDash
      </h1>
      {/* Taglines scroller */ }
      <IndexPageHeroTaglines/>
      <div
        className={ "flex gap-4 pt-7 items-center justify-center animate__animated animate__fadeIn animate__750ms" }
      >
        <Link
          to={ "/login" }
          className={ "pl-4 pr-4 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full animate__animated animate__tada animate__1s" }
        >
          Login
        </Link>
        <Link
          to={ "/login/signup" }
          className={ "hover:text-theme-500 active:text-theme-400 text-theme-200 transition-colors select-none cursor-pointer" }
        >
          Signup
        </Link>
      </div>
    </div>
    <FloatingApplications/>
  </section>;
};

export default IndexPageHero;