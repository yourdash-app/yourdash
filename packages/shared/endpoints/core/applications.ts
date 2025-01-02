/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { APPLICATION_TYPE } from "../../core/application.js";

export default interface EndpointResponseCoreApplications {
  applications: {
    id: string;
    type: APPLICATION_TYPE;
  }[];
}
