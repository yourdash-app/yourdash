import "animate.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createRoutesFromElements, Route, RouterProvider } from "react-router"
import ComingSoon from "./ComingSoon"
import DocsLayout from "./docs/Layout"
import ErrorElement from "./ErrorElement"
import "./ui/ui.scss"
import "./index.css"
import LoginPage from "./login/LoginPage.jsx"
import Root from "./Root.jsx"
import ServerLoginPage from "./login/ServerLoginPage.jsx"
import AppLayout from "./app/Layout.jsx"
import ApplicationRedirectToDash from "./app/ApplicationRedirectToDash.jsx"
import { createHashRouter } from "react-router-dom"
import RightClickMenuRootContainer from "./ui/components/rightClickMenu/RightClickMenuRootContainer.jsx"
import AppRouter from "./app/AppRouter.jsx"

ReactDOM.createRoot( document.getElementById( "root" ) as HTMLElement ).render(
  <React.StrictMode>
    <RightClickMenuRootContainer>
      <RouterProvider
        router={ createHashRouter(
          createRoutesFromElements(
            <Route errorElement={ <ErrorElement/> }>
              <Route index element={ <Root/> }/>
              <Route path={ "/signup" } element={ <ComingSoon/> }/>
              <Route path={ "/login" }>
                <Route index element={ <LoginPage/> }/>
                <Route path={ "server" } element={ <ServerLoginPage/> }/>
              </Route>
              <Route path={ "app" }>
                <Route element={ <AppLayout/> }>
                  <Route index element={ <ApplicationRedirectToDash/> }/>
                  <Route path={ "a/*" } element={ <AppRouter/> }/>
                  <Route path={ "profile" } element={ <ComingSoon/> }/>
                  <Route path={ "settings" } element={ <ComingSoon/> }/>
                </Route>
              </Route>
              <Route path={ "docs" } element={ <DocsLayout/> }>
                <Route index/>
              </Route>
            </Route>
          )
        ) }
      />
    </RightClickMenuRootContainer>
  </React.StrictMode>
)
