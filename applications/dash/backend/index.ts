/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";

export default class DashModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
  }

  public loadEndpoints() {
    super.loadEndpoints();

    this.api.request.setNamespace("app:dash");

    this.api.request.get("/user-full-name", async (req, res) => {
      res.json(
        (await this.api.getUser(req).getName()) || {
          first: "Unknown",
          last: "User",
        },
      );
    });

    this.api.request.get("/widget/pages", async (req, res) => {
      // return the number of widget pages a user has

      return res.json({
        pageCount: 3,
      });
    });

    // TODO: implement module system
    this.api.request.get("/widgets/:page", async (req, res) => {
      res.json({ success: true });
    });
  }
}
