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
import { SideBar } from "../../ui";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../index/components/Header";
import { YourDashIcon } from "../../ui/components/icon/iconDictionary";

const DocsLayout: React.FC = () => {
  const navigate = useNavigate();
  return (
    <main className={"grid grid-rows-[auto,1fr] h-full w-full"}>
      <Header/>
      <main className={"grid grid-cols-[auto,1fr] h-full w-full"}>
        <SideBar
          expandedByDefault
          title={"YourDash Docs"}
          items={[
            {
              icon: YourDashIcon.Home16,
              label: "Overview",
              onClick() {
                navigate( "/docs/" );
              }
            },
            {
              icon: YourDashIcon.Info16,
              label: "Get Started",
              onClick() {
                navigate( "/docs/get-started" );
              }
            },
            {
              icon: YourDashIcon.Accessibility16,
              label: "Translation",
              onClick() {
                navigate( "/docs/translation" );
              }
            }
          ]}
        />
        <Outlet/>
      </main>
    </main>
  );
};

export default DocsLayout;
