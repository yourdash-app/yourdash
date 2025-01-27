/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import "animate.css";
import "./tailwindcss.css";
import "./main.css";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import UIKitRoot from "@yourdash/uikit/src/core/root.js";
import UKDialog from "@yourdash/uikit/src/views/dialog/UKDialog.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import loadable from "@loadable/component";
import ApplicationRedirectToDash from "./app/ApplicationRedirectToDash.tsx";
import AppLayout from "./app/AppLayout.tsx";
import LoginIndexPagePreload from "./root/login/index.preload.tsx";
import LoginInstancePage from "./root/login/instance/index.tsx";
import Navigation from "./root/components/navigation/navigation.tsx";
import DocsLayout from "./root/docs/Layout.tsx";
import ErrorElement from "./ErrorElement.tsx";
import Index from "./root/index/Index.tsx";
import LoginRedirect from "./deprecatedLogin/Redirect.tsx";
import SignupPage from "./root/login/signup/index.tsx";
import LoginSuccessPage from "./root/login/success/index.tsx";
import NotFoundPage from "./root/notFound/notFound.tsx";
import ProjectsIndexPage from "./root/projects/Index.tsx";
import LinkerDesktopClientStartupPage from "./root/linkerDesktopClientStartup/Index.tsx";
import HostedApplicationRouter from "./app/HostedApplicationRouter.tsx";
import WebsocketToasts from "./WebsocketToasts.tsx";

const AppRouter = loadable(() => import("./app/AppRouter.tsx"));
const DocsRouter = loadable(() => import("./root/docs/DocsRouter.tsx"));
const ProjectsRouter = loadable(() => import("./root/projects/ProjectsRouter.tsx"));

const element = document.getElementById("root") as HTMLElement;

const loadingElement = document.createElement("h1");

loadingElement.style.display = "flex";
loadingElement.style.width = "100%";
loadingElement.style.height = "100%";
loadingElement.style.justifyContent = "center";
loadingElement.style.alignItems = "center";
loadingElement.innerText = "Loading YourDash...";

element.appendChild(loadingElement);

ReactDOM.createRoot(element).render(
  <UIKitRoot>
    <WebsocketToasts />
    <RouterProvider
      future={{
        v7_startTransition: true,
      }}
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
                path={"*"}
                element={<NotFoundPage />}
              />
            </Route>
            <Route element={<Navigation subtitle={"Docs"} />}>
              <Route
                path={"docs/*"}
                element={<DocsLayout />}
              >
                <Route
                  path={"*"}
                  element={<DocsRouter />}
                />
              </Route>
            </Route>
            <Route element={<Navigation subtitle={"Projects"} />}>
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
              <Route element={<Navigation subtitle={"Instance"} />}>
                <Route
                  path={"signup"}
                  element={<SignupPage />}
                />
              </Route>
              <Route
                path={"signup"}
                element={<>TODO: implement me @ewsgit</>}
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
                  errorElement={<ErrorElement />}
                  element={
                    <>
                      <AppRouter />
                    </>
                  }
                />
                <Route
                  path={"h/*"}
                  element={<HostedApplicationRouter />}
                />
              </Route>
            </Route>
            <Route path={"uikit-testing"}>
              <Route
                path={"dialog"}
                element={
                  <>
                    <UKDialog>sa</UKDialog>
                    <UKText text={"Hello world"} />
                  </>
                }
              />
            </Route>
          </Route>,
        ),
        {
          future: {
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_relativeSplatPath: true,
            v7_skipActionErrorRevalidation: true,
          },
        },
      )}
    />
  </UIKitRoot>,
);
