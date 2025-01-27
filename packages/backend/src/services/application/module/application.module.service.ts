/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashService from "../../../core/serviceManager/service.js";
import YourDashServiceStartupType from "../../../core/serviceManager/serviceStartupType.js";

export default class ApplicationModuleService extends YourDashService {
  constructor() {
    super(
      "uk.ewsgit.yourdash.applicationservice.module",
      "Application module service",
      "Ewsgit",
      ["uk.ewsgit.yourdash.applicationservice"],
      YourDashServiceStartupType.default,
    );

    return this;
  }
}
