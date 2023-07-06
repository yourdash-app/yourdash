import "animate.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {createRoutesFromElements, Route, RouterProvider} from "react-router";
import {createHashRouter} from "react-router-dom";
import loadable from "@loadable/component";
import ApplicationRedirectToDash from "./app/ApplicationRedirectToDash.jsx";
import AppLayout from "./app/Layout.jsx";
import ComingSoon from "./ComingSoon";
import DocsLayout from "./root/docs/Layout";
import ErrorElement from "./ErrorElement";
import "./ui/ui.scss";
import "./index.css";
import LoginPage from "./login/LoginPage.jsx";
import ServerLoginPage from "./login/ServerLoginPage.jsx";
import Index from "./root/index/Index";
import RightClickMenuRootContainer from "./ui/components/rightClickMenu/RightClickMenuRootContainer.jsx";

const AppRouter = loadable(() => import("./app/AppRouter"));

const DocsRouter = loadable(() => import("./root/docs/DocsRouter"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
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
