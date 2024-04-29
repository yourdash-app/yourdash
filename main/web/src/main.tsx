/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import "animate.css";
import "./tailwindcss.css";
import "./main.css";
import UIKitRoot from "@yourdash/uikit/core/root.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import ApplicationRedirectToDash from "./app/ApplicationRedirectToDash.jsx";
import AppLayout from "./app/AppLayout";
import ComingSoon from "@yourdash/chiplet/views/ComingSoon.jsx";
import LoginIndexPagePreload from "./login/index.preload.js";
import LoginInstancePage from "./login/instance/index.js";
import Navigation from "./root/components/navigation/navigation.js";
import DocsLayout from "./root/docs/Layout";
import ErrorElement from "./ErrorElement";
import Index from "./root/index/Index";
import LoginRedirect from "./deprecatedLogin/Redirect";
import LoginSuccessPage from "./login/success/index.js";
import ProjectsIndexPage from "./root/projects/Index";
import ChipletRootIntegration from "@yourdash/chiplet/RootIntegration";
import LinkerDesktopClientStartupPage from "./root/linkerDesktopClientStartup/Index";
import HostedApplicationRouter from "./app/HostedApplicationRouter";

const AppRouter = loadable(() => import("./app/AppRouter"));
const DocsRouter = loadable(() => import("./root/docs/DocsRouter"));
const ProjectsRouter = loadable(() => import("./root/projects/ProjectsRouter"));

function main() {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ChipletRootIntegration>
      <UIKitRoot>
        <RouterProvider
          router={createBrowserRouter(
            createRoutesFromElements(
              <Route errorElement={<ErrorElement />}>
                <Route
                  path={"/linker-desktop-client-startup"}
                  element={<LinkerDesktopClientStartupPage />}
                />
                <Route element={<Navigation />}>
                  <Route
                    index
                    element={<Index />}
                  />
                  <Route
                    path={"/signup"}
                    element={<ComingSoon />}
                  />
                  <Route
                    path={"docs/*"}
                    element={<DocsLayout />}
                  >
                    <Route
                      path={"*"}
                      element={<DocsRouter />}
                    />
                  </Route>
                  <Route
                    path={"projects"}
                    index
                    element={<ProjectsIndexPage />}
                  />
                </Route>
                <Route
                  path={"projects/*"}
                  element={<ProjectsRouter />}
                />
                <Route
                  path={"project/*"}
                  element={<ProjectsRouter />}
                />
                <Route
                  path={"proj/*"}
                  element={<ProjectsRouter />}
                />
                <Route path={"login"}>
                  <Route
                    index
                    element={<LoginIndexPagePreload />}
                  />
                  <Route
                    path={"success"}
                    element={<LoginSuccessPage />}
                  />
                  <Route
                    path={"signup"}
                    element={<>TODO: implement me</>}
                  />
                  <Route path={"instance"}>
                    <Route
                      index
                      element={<LoginInstancePage />}
                    />
                    <Route
                      path={"*"}
                      element={<LoginRedirect />}
                    />
                  </Route>
                </Route>
                <Route path={"app"}>
                  <Route element={<AppLayout />}>
                    <Route
                      index
                      element={<ApplicationRedirectToDash />}
                    />
                    <Route
                      path={"a/*"}
                      element={<AppRouter />}
                    />
                    <Route
                      path={"h/*"}
                      element={<HostedApplicationRouter />}
                    />
                  </Route>
                </Route>
              </Route>,
            ),
          )}
        />
      </UIKitRoot>
    </ChipletRootIntegration>,
  );
}

const element = document.getElementById("root") as HTMLElement;

const loadingElement = document.createElement("h1");

loadingElement.style.display = "flex";
loadingElement.style.width = "100%";
loadingElement.style.height = "100%";
loadingElement.style.justifyContent = "center";
loadingElement.style.alignItems = "center";
loadingElement.innerText = "Loading YourDash...";

element.appendChild(loadingElement);

main();
