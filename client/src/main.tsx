import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ComingSoon from "./ComingSoon";
import ErrorElement from "./ErrorElement";
import LoginPage from "./login/LoginPage";
import Root from "./Root";

const router = createBrowserRouter( createRoutesFromElements( <>
  <Route errorElement={ <ErrorElement/> } path={ "/" } element={ <Root/> }/>
  <Route path={ `/login` } element={ <LoginPage/> }>
    <Route path={ `signup` } element={ <ComingSoon/> }/>
  </Route>
  <Route path={ `/app` } element={ <ComingSoon/> }>
    <Route path={ `a` } element={ <ComingSoon/> }>
      <Route path={ `:application` } element={ <ComingSoon/> }/>
    </Route>
    <Route path={ `profile` } element={ <ComingSoon/> }/>
    <Route path={ `settings` } element={ <ComingSoon/> }/>
  </Route>
</> ) );

ReactDOM.createRoot( document.getElementById( `root` ) as HTMLElement ).render( <React.StrictMode>
  <RouterProvider router={ router }/>
</React.StrictMode>, )
