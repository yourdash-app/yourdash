/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import BackendModule, { YourDashModuleArguments } from "@yourdash/backend/src/core/moduleManager/backendModule.js";

export default class YourDevModule extends BackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
  }

  public loadEndpoints() {
    super.loadEndpoints();

    const wss = this.API.core.websocketManager.createServer("/app/yourdev");
    wss.onConnection((connection) => {
      connection.onChannel("message", (message) => {
        console.log(message);
        connection.emit("message", "world");
      });
    });

    this.API.request.get("/app/yourdev/", (req, res) => {
      return res.json({ success: true });
    });
  }
}
