/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, lazy } from "solid-js";

// @ts-ignore
const ApplicationRoute: Component<{ applicationId: string }> = (props) => {
  return {
    path: props.applicationId,
    component: () => lazy(async () => await import(`@yourdash/applications/${props.applicationId}/web/index.tsx`)),
  };
};

export default ApplicationRoute;
