import 'animate.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ComingSoon from "./ComingSoon";
import ErrorElement from "./ErrorElement";
import './index.css'
import LoginPage from "./login/LoginPage";
import Root from "./Root";
import UiComponentTest from "./ui/DevTest"

ReactDOM.createRoot( document.getElementById( `root` ) as HTMLElement ).render( <React.StrictMode>
  <RouterProvider router={ createBrowserRouter( createRoutesFromElements( <>
    <Route errorElement={ <ErrorElement/> }>
      <Route path={ `/` } element={ <Root/> }/>
      <Route path={ `/login` } element={ <LoginPage/> }/>
      <Route path={ `/signup` } element={ <ComingSoon/> }/>
      <Route path={ `/app` } element={ <ComingSoon/> }/>
      <Route path={ `/app/a` } element={ <ComingSoon/> }/>
      <Route path={ `/app/a/:application` } element={ <ComingSoon/> }/>
      <Route path={ `/app/profile` } element={ <ComingSoon/> }/>
      <Route path={ `/app/settings` } element={ <ComingSoon/> }/>
      <Route path={ `/dev/uitest` } element={ <UiComponentTest/> }/>
    </Route>
  </> ) ) }/>
</React.StrictMode>, )
