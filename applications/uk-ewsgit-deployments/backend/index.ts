/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "@yourdash/backend/src/core/core.js";
import generateUUID from "@yourdash/shared/web/helpers/uuid.js";
import * as path from "path";
import ChatbotsBotApplication from "../shared/application.js";
import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
import FSError from "@yourdash/backend/src/core/fileSystem/FSError.js";

export default class DeploymentsModule extends YourDashBackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);

    return this;
  }

  public loadEndpoints() {
    return 0;
  }
}
