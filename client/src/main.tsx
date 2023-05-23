import "animate.css"
import React from "react"
import ReactDOM from "react-dom/client"
import { createRoutesFromElements, Route, RouterProvider } from "react-router"
import { createHashRouter } from "react-router-dom"
import ApplicationRedirectToDash from "./app/ApplicationRedirectToDash.jsx"
import AppLayout from "./app/Layout.jsx"
import ComingSoon from "./ComingSoon"
import DocsLayout from "./docs/Layout"
import ErrorElement from "./ErrorElement"
import "./ui/ui.scss"
import "./index.css"
import LoginPage from "./login/LoginPage.jsx"
import ServerLoginPage from "./login/ServerLoginPage.jsx"
import Root from "./Root.jsx"
import RightClickMenuRootContainer from "./ui/components/rightClickMenu/RightClickMenuRootContainer.jsx"
import loadable from "@loadable/component"

const AppRouter = loadable( () => {
  return import( "./app/AppRouter" )
} )

const DocsRouter = loadable( () => {
  return import( "./docs/DocsRouter" )
} )

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
                  <Route
                    path={ "a/*" }
                    element={ <AppRouter/> }
                  />
                </Route>
              </Route>
              <Route path={ "docs/*" } element={ <DocsLayout/> }>
                <Route path={ "*" } element={ <DocsRouter/> }/>
              </Route>
            </Route>
          )
        ) }
      />
    </RightClickMenuRootContainer>
  </React.StrictMode>
)
