/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { INSTANCE_STATUS } from "@yourdash/shared/core/instanceStatus.js";
import { YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import { compareHashString } from "../../lib/encryption.js";
import { createSession } from "../../lib/session.js";
import { Core } from "../core.js";
import FSFile from "../fileSystem/FSFile.js";
import generateUUID from "../helpers/generateUUID.js";
import YourDashUser from "../user/index.js";
import path from "path";

export const MIMICED_NEXTCLOUD_VERSION = {
  major: 28,
  minor: 0,
  micro: 3,
  string: "28.0.3",
  edition: "YourDash Cross-Compatability",
  extendedSupport: false,
};

export default function loadNextCloudSupportEndpoints(core: Core) {
  core.request.setNamespace("");

  core.request.get("/status.php", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    switch (req.headers["Content-Type"]) {
      case "application/json":
        return res.json({
          installed: true,
          maintenance: core.instanceStatus === INSTANCE_STATUS.MAINTENANCE,
          needsDbUpgrade: false,
          version: "28.0.0.11",
          versionstring: MIMICED_NEXTCLOUD_VERSION.string,
          edition: MIMICED_NEXTCLOUD_VERSION.edition,
          productname: core.globalDb.get("core:instance:name"),
          extendedSupport: MIMICED_NEXTCLOUD_VERSION.extendedSupport,
        });
    }

    return res.json({
      installed: true,
      maintenance: core.instanceStatus === INSTANCE_STATUS.MAINTENANCE,
      needsDbUpgrade: false,
      version: "28.0.0.11",
      versionstring: MIMICED_NEXTCLOUD_VERSION.string,
      edition: MIMICED_NEXTCLOUD_VERSION.edition,
      productname: core.globalDb.get("core:instance:name"),
      extendedSupport: MIMICED_NEXTCLOUD_VERSION.extendedSupport,
    });
  });

  core.request.get("/ocs/v2.php/cloud/capabilities", async (req, res) => {
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
                delay: 200, // arbitrary value in milisecconds
                "allow-listed": false,
              },
              theming: {
                name: core.globalDb.get("core:instance:name") || "YourDash",
                url: core.globalDb.get("core:instanceUrl") || "http://localhost:3563",
                slogan: core.globalDb.get("core:login:message"),
                color: "#00679e",
                "color-text": "#ffffff",
                "color-element": "#00679e",
                "color-element-bright": "#00679e",
                "color-element-dark": "#00679e",
                logo: `http://${req.hostname || "localhost:3563"}/index.php/apps/theming/image/logo?useSvg=1&v=2`,
                background: `http://${req.hostname || "localhost:3563"}/index.php/apps/theming/image/background?v=2`,
                "background-plain": false,
                "background-default": false,
                logoheader: `http://${req.hostname || "localhost:3563"}/index.php/apps/theming/image/logo?useSvg=1&v=2`,
                favicon: `http://${req.hostname || "localhost:3563"}/index.php/apps/theming/image/logo?useSvg=1&v=2`,
              },
            },
          },
        },
      });
    }
  });

  let nextcloudAuthSessions: { [authSessionToken: string]: { authPollToken: string } } = {};
  let nextcloudAuthorisedSessions: { [authPollToken: string]: { username: string; sessionToken: string } } = {};

  core.request.post("/login/nextcloud/flow/v2/authenticate", async (req, res) => {
    if (!req.body) return res.status(400).json({ error: "Invalid or missing request body" });

    const username = req.body.username;
    const password = req.body.password;
    const authToken = req.body.authtoken;

    if (!username || username === "") {
      return res.json({ error: "Missing username" });
    }

    if (!password || password === "") {
      return res.json({ error: "Missing password" });
    }

    const user = new YourDashUser(username);

    let savedHashedPassword = "";
    try {
      savedHashedPassword = await ((await core.fs.getFile(path.join(user.path, "core/password.enc"))) as FSFile).read("string");
    } catch (e) {
      core.log.error("authentication", "Unable to read password from disk", e);
    }

    return compareHashString(savedHashedPassword, password)
      .then(async (result) => {
        if (result) {
          const session = await createSession(username, YOURDASH_SESSION_TYPE.NEXTCLOUD_COMPATABILITY);

          /*
            token: session.sessionToken,
            // only used for the session's management page
            sessionId: session.sessionId,
          */

          nextcloudAuthorisedSessions[nextcloudAuthSessions[authToken].authPollToken] = {
            username: username,
            sessionToken: session.sessionToken,
          };

          return res.json({
            successs: true,
          });
        } else {
          core.log.info("login", `Incorrect password provided for user ${username}`);
          return res.json({ error: "Incorrect password" });
        }
      })
      .catch(() => {
        core.log.error("login", `Hash comparison failed for user ${username}`);
        res.status(500);
        return res.json({ error: "Login failure" });
      });
  });

  core.request.post("/index.php/login/v2", async (req, res) => {
    const authSessionPollToken = generateUUID();
    const authSessionToken = generateUUID();

    nextcloudAuthSessions[authSessionToken] = { authPollToken: authSessionPollToken };

    // authSessionToken
    // authSessionPollToken
    // sessionToken

    return res.json({
      poll: {
        token: authSessionPollToken,
        endpoint: `http://${req.hostname}:3563/index.php/login/v2/poll`,
      },
      login: `http://localhost:5173/login/nextcloud/flow/v2/${authSessionToken}`,
    });
  });

  core.request.post("/index.php/login/v2/poll", async (req, res) => {
    const authSessionPollToken = req.body.token;
    const authSession = nextcloudAuthorisedSessions[authSessionPollToken];

    if (!authSession) {
      return res.status(404).send("");
    }

    return res.json({
      server: `http://${req.hostname}:3563`,
      loginName: authSession.username,
      appPassword: authSession.sessionToken,
    });
  });

  core.request.get("/ocs/v1.php/cloud/user", async (req, res) => {
    return res.json({ status: "ok" });
  });

  /*   // handle nextcloud compatability authentication
  core.request.usePath("/remote.php/", async (req, res, next) => {
    return res.contentType("http/xml").send(`<?xml version="1.0" encoding="utf-8"?>
      <d:error xmlns:d="DAV:" xmlns:s="http://sabredav.org/ns">
        <s:exception>Internal Server Error</s:exception>
        <s:message>The server was unable to complete your request.
If this happens again, please send the technical details below to the server administrator.
More details can be found in the server log.
        </s:message>
        <s:technical-details>
          <s:remote-address>::1</s:remote-address>
          <s:request-id>ibCxTsPl4KN7sufuReK6</s:request-id>
        </s:technical-details>
      </d:error>`);
  }); */

  core.request.propfind("/remote.php/dav/files/:username/*", async (req, res) => {
    console.log({ username: req.params.username, params: Object.values(req.params).join("/") });
    if (req.params["*"] === "/") {
      return res.contentType("http/xml").send(`<?xml version="1.0" encoding="utf-8"?>
      <d:error xmlns:d="DAV:" xmlns:s="http://sabredav.org/ns">
        <s:exception>Internal Server Error</s:exception>
        <s:message>The server was unable to complete your request.
If this happens again, please send the technical details below to the server administrator.
More details can be found in the server log.
        </s:message>
        <s:technical-details>
          <s:remote-address>::1</s:remote-address>
          <s:request-id>ibCxTsPl4KN7sufuReK6</s:request-id>
        </s:technical-details>
      </d:error>`);
    } else {
      return res.json({ error: true });
    }
  });
}
