/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";

export default class DashModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
  }

  public loadEndpoints() {
    super.loadEndpoints();

    this.API.request.get("/app/dash/user-full-name", async (req, res) => {
      res.json(
        (await this.API.getUser(req).getName()) || {
          first: "Unknown",
          last: "User",
        },
      );
    });

    // TODO: implement module system
    this.API.request.get("/app/dash/modules", async (req, res) => {
      res.json({ success: true });
    });
  }
}
