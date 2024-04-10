/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { CoreApi } from "../coreApi.js";
import { YOURDASH_INSTANCE_STATUS } from "../types/discoveryStatus.js";

export const MIMICED_NEXTCLOUD_VERSION = {
  major: 28,
  minor: 0,
  micro: 3,
  string: "28.0.3",
  edition: "YourDash",
  extendedSupport: false,
};

export default function loadNextCloudSupportEndpoints(coreApi: CoreApi) {
  coreApi.request.get("/status.php", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    switch (req.header("Content-Type")) {
      case "application/json":
        return res.json({});
    }

    return res.json({
      installed: true,
      maintenance: coreApi.instanceStatus === YOURDASH_INSTANCE_STATUS.MAINTENANCE,
      needsDbUpgrade: false,
      version: "28.0.0.11",
      versionstring: MIMICED_NEXTCLOUD_VERSION.string,
      edition: MIMICED_NEXTCLOUD_VERSION.edition,
      productname: coreApi.globalDb.get("core:displayName"),
      extendedSupport: MIMICED_NEXTCLOUD_VERSION.extendedSupport,
    });
  });

  coreApi.request.use("/remote.php/dav", (req, res, next) => {
    return res.redirect(`${coreApi.globalDb.get("core:instanceUrl")}/dav/${req.path.replace("/remote.php/dav/", "")}`);
  });

  coreApi.request.get("/ocs/v2.php/cloud/capabilities", (req, res) => {
    if (req.query.format === "json") {
      return res.json({
        ocs: {
          meta: {
            status: "ok",
            statuscode: 200,
            message: "OK",
          },
          data: {
            version: {
              major: MIMICED_NEXTCLOUD_VERSION.major,
              minor: MIMICED_NEXTCLOUD_VERSION.minor,
              micro: MIMICED_NEXTCLOUD_VERSION.micro,
              string: MIMICED_NEXTCLOUD_VERSION.string,
              edition: MIMICED_NEXTCLOUD_VERSION.edition,
              extendedSupport: MIMICED_NEXTCLOUD_VERSION.extendedSupport,
            },
            capabilities: {
              bruteforce: {
                delay: 200, // arbitrary value
                "allow-listed": false,
              },
              theming: {
                name: coreApi.globalDb.get("core:displayName") || "YourDash",
                url: coreApi.globalDb.get("core:instanceUrl") || "https://localhost:3563",
                slogan: coreApi.globalDb.get("core:login:message"),
                color: "#00679e",
                "color-text": "#ffffff",
                "color-element": "#00679e",
                "color-element-bright": "#00679e",
                "color-element-dark": "#00679e",
                logo: "https://192.168.1.64/index.php/apps/theming/image/logo?useSvg=1&v=2",
                background: "https://192.168.1.64/index.php/apps/theming/image/background?v=2",
                "background-plain": false,
                "background-default": false,
                logoheader: "https://192.168.1.64/index.php/apps/theming/image/logo?useSvg=1&v=2",
                favicon: "https://192.168.1.64/index.php/apps/theming/image/logo?useSvg=1&v=2",
              },
            },
          },
        },
      });
    }
  });
}
