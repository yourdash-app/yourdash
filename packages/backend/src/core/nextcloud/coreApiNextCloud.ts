/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreApi from "../coreApi.js";

export default function loadNextCloudSupportEndpoints() {
  coreApi.expressServer.get("/status.php", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    return res.json({
      installed: true,
      maintenance: coreApi.isInMaintenance,
      needsDbUpgrade: false,
      version: "28.0.0.11",
      versionstring: "28.0.0",
      edition: "YourDash",
      productname: coreApi.globalDb.get("displayName"),
      extendedSupport: false,
    });
  });
}
