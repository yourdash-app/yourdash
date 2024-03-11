/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";

export default class EndpointsModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
    this.API.request.get("/app/endpoints/endpoints", (req, res) => res.json(this.API.request._router.stack));
  }
}
