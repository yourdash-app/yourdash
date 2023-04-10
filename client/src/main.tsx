import "animate.css";
import React from "react";
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
import RightClickMenuRootContainer from "./ui/components/rightClickMenu/RightClickMenuRootContainer";
import AppRouter from "./app/AppRouter";

ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement).render(
  <React.StrictMode>
    <RightClickMenuRootContainer>
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
    </RightClickMenuRootContainer>
  </React.StrictMode>
);
