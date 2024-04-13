/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UIKitRoot from "@yourdash/uikit/core/root.js";
/* @refresh reload */
import { render } from "solid-js/web";

// begin imports here
import "./index.css";
import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error("YourDash Initialization Error: SolidRoot element not found!!!");
}

render(() => {
  return (
    <UIKitRoot>
      <Router>
        <Route
          path="/"
          component={lazy(() => import("./root/layout"))}
        >
          <Route
            path={"/"}
            component={lazy(() => import("./root/index"))}
          />
        </Route>
        <Route
          path={"/docs"}
          component={lazy(() => import("./docs/layout"))}
        >
          <Route
            path={"/"}
            component={lazy(() => import("./docs/index"))}
          />
        </Route>
      </Router>
    </UIKitRoot>
  );
}, root!);
