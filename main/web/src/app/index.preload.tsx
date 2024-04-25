/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Route } from "@solidjs/router";
import csi from "@yourdash/csi/csi.js";
import { APPLICATION_TYPE } from "@yourdash/shared/core/application.js";
import EndpointResponseApplications from "@yourdash/shared/endpoints/applications.js";
import { Component, Suspense, createResource, lazy } from "solid-js";
import LoginSuccessPage from "../login/success/index.js";

const ApplicationIndexPreload: Component = () => {
  // @ts-ignore
  const [applications] = createResource(async () => await csi.getJson<EndpointResponseApplications>("/applications"));

  return (
    <Suspense fallback={<LoginSuccessPage />}>
      <Route
        path={"*"}
        component={() => <>COMP</>}
      />
      <Route path={"/"} />
      {applications()?.applications.map((app) => {
        switch (app.type) {
          // a local application hosted by YourDash Web (no warning)
          case APPLICATION_TYPE.LOCAL:
            return (
              <Route
                path={app.id}
                component={lazy(() => import(`@yourdash/applications/${app.id}/web/index`))}
              />
            );
          // an iframe to a localhost url (no warning)
          case APPLICATION_TYPE.EXTERNAL:
            return <>EXTERNAL APPLICATION SUPPORT IS NOT YET IMPLEMENTED</>;
          // an iframe to an external url (security warning)
          case APPLICATION_TYPE.IFRAME:
            return <>EXTERNAL APPLICATION SUPPORT IS NOT YET IMPLEMENTED</>;
        }
      })}
      <Route
        path={"*"}
        component={() => <>UNKNOWN ROUTE</>}
      />
    </Suspense>
  );
};

export default ApplicationIndexPreload;
