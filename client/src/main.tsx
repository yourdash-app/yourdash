import "animate.css";
import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import ComingSoon from "./ComingSoon";
import ErrorElement from "./ErrorElement";
import "./ui/ui.scss";
import "./index.css";
import LoginPage from "./login/LoginPage";
import Root from "./Root";
import ServerLoginPage from "./login/ServerLoginPage";
import AppLayout from "./app/Layout";
import ApplicationRedirectToDash from "./app/ApplicationRedirectToDash";
import { createHashRouter } from "react-router-dom";

const AppRouter = lazy(() => import("./app/AppRouter"));

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider
      router={createHashRouter(
        createRoutesFromElements(
          <Route errorElement={<ErrorElement />}>
            <Route index element={<Root />} />
            <Route path={`/signup`} element={<ComingSoon />} />
            <Route path={`/login`}>
              <Route index element={<LoginPage />} />
              <Route path={`server`} element={<ServerLoginPage />} />
            </Route>
            <Route path={`app`}>
              <Route element={<AppLayout />}>
                <Route index element={<ApplicationRedirectToDash />} />
                <Route path={`a/*`} element={<AppRouter />} />
                <Route path={`profile`} element={<ComingSoon />} />
                <Route path={`settings`} element={<ComingSoon />} />
              </Route>
            </Route>
          </Route>
        )
      )}
    />
    <div
      className={`fixed bottom-0 right-0 p-1 pl-2 rounded-tl-xl bg-container-bg text-container-fg pointer-events-none`}
    >
      Work in progress build
    </div>
  </React.StrictMode>
);
