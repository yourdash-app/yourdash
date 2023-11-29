/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useInitial } from "./useInitial";

const ComponentPreviews = React.lazy( () => import( "./previews" ) );

export {
  ComponentPreviews,
  useInitial
};
