/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashServiceStartupType from "./serviceStartupType.js";

export default class YourDashService {
  __serviceInternals: {
    // service's ID
    id: string;
    // service's display name
    name: string;
    // author of the service
    author: string;
    // service's startup type
    startupType: YourDashServiceStartupType;
    // service's dependencies
    dependsOn: string[];
  };

  constructor(
    id: YourDashService["__serviceInternals"]["id"],
    name: YourDashService["__serviceInternals"]["name"],
    author: YourDashService["__serviceInternals"]["author"],
    dependsOn: YourDashService["__serviceInternals"]["dependsOn"],
    startupType?: YourDashService["__serviceInternals"]["startupType"],
  ) {
    this.__serviceInternals = {
      id,
      name,
      author,
      dependsOn: dependsOn,
      startupType: startupType || YourDashServiceStartupType.default,
    };

    return this;
  }

  // this function will be called when the service is initialized by the YourDashCoreServiceManager
  onInit() {
    /* empty function */
  }

  // this function will be called when the service is unloaded by the YourDashCoreServiceManager
  onUnload() {
    /* empty function */
  }
}
