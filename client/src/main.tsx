import 'animate.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import ComingSoon from "./ComingSoon";
import ErrorElement from "./ErrorElement";
import './index.css'
import LoginPage from "./login/LoginPage";
import Root from "./Root";

ReactDOM.createRoot( document.getElementById( `root` ) as HTMLElement ).render( <React.StrictMode>
  <RouterProvider router={ createHashRouter( createRoutesFromElements( <>
    <Route errorElement={ <ErrorElement/> }>
      <Route path={ `/` } element={ <Root/> }/>
      <Route path={ `/login` } element={ <LoginPage/> }/>
      <Route path={ `/signup` } element={ <ComingSoon/> }/>
      <Route path={ `/app` } element={ <ComingSoon/> }/>
      <Route path={ `/app/a` } element={ <ComingSoon/> }/>
      <Route path={ `/app/a/:application` } element={ <ComingSoon/> }/>
      <Route path={ `/app/profile` } element={ <ComingSoon/> }/>
      <Route path={ `/app/settings` } element={ <ComingSoon/> }/>
    </Route>
  </> ) ) }/>
</React.StrictMode>, )
