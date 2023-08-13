/*
 * Copyright (c) 2023 YourDash contributors.
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

import React from "react";
import ComingSoon from "../../../../ComingSoon";
import { MajorButton } from "../../../../ui";

const OverviewPage: React.FC = () => (
  <div className={"text-center"}>
    <h1 className={"text-6xl font-semibold tracking-wide animate__animated animate__fadeIn mt-8"}>Overview</h1>
    <p className={"animate__animated animate__fadeInDown animate__250ms mt-3"}>a quick and simple guide to the YourDash documentation</p>
    
    <footer className={"w-full flex max-w-screen-2xl"}>
      <MajorButton className={"ml-auto"}>{"Next page"}</MajorButton>
    </footer>
  </div>
);

export default OverviewPage;
