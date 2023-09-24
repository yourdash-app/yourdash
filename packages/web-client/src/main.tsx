/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
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
import AppLayout from "./app/AppLayout";
import ComingSoon from "./ComingSoon";
import DocsLayout from "./root/docs/Layout";
import ErrorElement from "./ErrorElement";
import LoginPage from "./root/login/LoginPage.jsx";
import ServerLoginPage from "./root/login/ServerLoginPage.jsx";
import Index from "./root/index/Index";
import ProjectsIndexPage from "./root/projects/Index";
import RootLayout from "./root/RootLayout";
import RightClickMenuRootContainer from "./ui/components/rightClickMenu/RightClickMenuRootContainer.jsx";
import "./tailwindcss.css";

const AppRouter = loadable( () => import( "./app/AppRouter" ) );
const DocsRouter = loadable( () => import( "./root/docs/DocsRouter" ) );
const ProjectsRouter = loadable( () => import( "./root/projects/ProjectsRouter" ) );

function main() {
  ReactDOM.createRoot( document.getElementById( "root" ) as HTMLElement ).render(
    <RightClickMenuRootContainer>
      <RouterProvider
        router={createHashRouter(
          createRoutesFromElements(
            <Route
              errorElement={<ErrorElement/>}
            >
              <Route
                element={<RootLayout/>}
              >
                <Route
                  index
                  element={<Index/>}
                />
                <Route
                  path={"/signup"}
                  element={<ComingSoon/>}
                />
                <Route
                  path={"docs/*"}
                  element={<DocsLayout/>}
                >
                  <Route
                    path={"*"}
                    element={(
                      <DocsRouter/>
                    )}
                  />
                </Route>
                <Route path={"projects"} index element={<ProjectsIndexPage/>}/>
              </Route>
              <Route
                path={"projects/*"}
                element={<ProjectsRouter/>}
              />
              <Route
                path={"project/*"}
                element={<ProjectsRouter/>}
              />
              <Route
                path={"proj/*"}
                element={<ProjectsRouter/>}
              />
              <Route path={"/login"}>
                <Route
                  index
                  element={<LoginPage/>}
                />
                <Route
                  path={"server"}
                  element={<ServerLoginPage/>}
                />
              </Route>
              <Route
                path={"app"}
              >
                <Route
                  element={<AppLayout/>}
                >
                  <Route
                    index
                    element={<ApplicationRedirectToDash/>}
                  />
                  <Route
                    path={"a/*"}
                    element={<AppRouter/>}
                  />
                </Route>
              </Route>
            </Route>
          )
        )}
      />
    </RightClickMenuRootContainer>
  );
}

const element = document.getElementById( "root" ) as HTMLElement

element.innerHTML = "<h1>Loading YourDash...</h1>"

main()
