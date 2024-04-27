/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Route } from "@solidjs/router";
import csi from "@yourdash/csi/csi.js";
import { APPLICATION_TYPE } from "@yourdash/shared/core/application.js";
import EndpointResponseCoreApplications from "@yourdash/shared/endpoints/core/applications.js";
import EndpointResponseCoreHomeApplication from "@yourdash/shared/endpoints/core/homeApplication.js";
import Redirect from "@yourdash/uikit/components/redirect/redirect.js";
import { Component, Suspense, createResource, lazy } from "solid-js";
import LoadingScreen from "./loadingScreen.js";

const ApplicationIndexPreload: Component = () => {
  const [applications] = createResource(
    async () => await csi.getJson<EndpointResponseCoreApplications>("/core/applications"),
  );
  const [homeApplication] = createResource(
    async () => await csi.getJson<EndpointResponseCoreHomeApplication>("/core/home-application"),
  );

  return (
    <>
      <Route
        path={""}
        component={() => <Redirect to={homeApplication() ? `/app/${homeApplication()?.applicationId || ""}` : null} />}
      />
      {/* {applications()?.applications.map((app) => {
        switch (app.type) {
          // a local application hosted by YourDash Web (no warning)
          case APPLICATION_TYPE.LOCAL:
            return (
              <Route
                path={app.id}
                component={() => <>Hello world</>}
              />
            );
          // an iframe to a localhost url (no warning)
          case APPLICATION_TYPE.EXTERNAL:
            return <>EXTERNAL APPLICATION SUPPORT IS NOT YET IMPLEMENTED</>;
          // an iframe to an external url (security warning)
          case APPLICATION_TYPE.IFRAME:
            return <>EXTERNAL APPLICATION SUPPORT IS NOT YET IMPLEMENTED</>;
        }
      })} */}
      <Route
        path={"*"}
        component={(props) => (
          <Suspense fallback={<LoadingScreen />}>
            <>UNKNOWN ROUTE {props.location}</>
          </Suspense>
        )}
      />
    </>
  );
};

export default ApplicationIndexPreload;
