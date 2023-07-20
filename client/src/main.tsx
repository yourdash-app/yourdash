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

import "animate.css";
import "./ui/ui.scss";
import "./main.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createHashRouter } from "react-router-dom";
import loadable from "@loadable/component";
import ApplicationRedirectToDash from "./app/ApplicationRedirectToDash.jsx";
import AppLayout from "./app/Layout.jsx";
import ComingSoon from "./ComingSoon";
import DocsLayout from "./root/docs/Layout";
import ErrorElement from "./ErrorElement";
import LoginPage from "./login/LoginPage.jsx";
import ServerLoginPage from "./login/ServerLoginPage.jsx";
import Index from "./root/index/Index";
import RightClickMenuRootContainer from "./ui/components/rightClickMenu/RightClickMenuRootContainer.jsx";
import "./tailwindcss.css";

const AppRouter = loadable( () => import( "./app/AppRouter" ) );

const DocsRouter = loadable( () => import( "./root/docs/DocsRouter" ) );

ReactDOM.createRoot( document.getElementById( "root" ) as HTMLElement ).render(
  <RightClickMenuRootContainer>
    <RouterProvider
      router={createHashRouter(
        createRoutesFromElements(
          <Route errorElement={<ErrorElement/>}>
            <Route index element={<Index/>}/>
            <Route path={"/signup"} element={<ComingSoon/>}/>
            <Route path={"/login"}>
              <Route index element={<LoginPage/>}/>
              <Route path={"server"} element={<ServerLoginPage/>}/>
            </Route>
            <Route path={"app"}>
              <Route element={<AppLayout/>}>
                <Route index element={<ApplicationRedirectToDash/>}/>
                <Route
                  path={"a/*"}
                  element={<AppRouter/>}
                />
              </Route>
            </Route>
            <Route path={"docs/*"} element={<DocsLayout/>}>
              <Route
                path={"*"}
                element={(
                  <DocsRouter/>
                )}
              />
            </Route>
          </Route>
        )
      )}
    />
  </RightClickMenuRootContainer>
);
