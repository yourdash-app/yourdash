/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { INSTANCE_STATUS } from "@yourdash/shared/core/instanceStatus.js";
import { YOURDASH_SESSION_TYPE } from "@yourdash/shared/core/session.js";
import { USER_AVATAR_SIZE } from "@yourdash/shared/core/userAvatarSize.js";
import { compareHashString, generateRandomStringOfLength } from "../../lib/encryption.js";
import { createSession } from "../../lib/session.js";
import { Core } from "../core.js";
import FSFile from "../fileSystem/FSFile.js";
import generateUUID from "../helpers/generateUUID.js";
import YourDashUser from "../user/index.js";
import path from "path";
import { Request as ExpressRequest } from "express";
import { Database } from "bun:sqlite";
import xmlBodyParser from "express-xml-bodyparser";

export const MIMICED_NEXTCLOUD_VERSION = {
  major: 28,
  minor: 0,
  micro: 3,
  string: "28.0.3",
  edition: "YourDash Cross-Compatability",
  extendedSupport: false,
};

export default function loadNextCloudSupportEndpoints(core: Core) {
  const sessionDatabase = new Database(path.join(core.fs.ROOT_PATH, "./nextcloud-sessions.db"), { strict: true, create: true });

  sessionDatabase.run(`CREATE TABLE IF NOT EXISTS Database ( username TEXT, sessionToken TEXT );`);

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

  core.request.get(["/ocs/v2.php/cloud/capabilities", "/ocs/v1.php/cloud/capabilities"], async (req, res) => {
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

  core.request.post("/index.php/login/v2", async (req, res) => {
    const authSessionPollToken = generateUUID();
    const authSessionToken = generateUUID();

    console.log({
      poll: {
        token: authSessionPollToken,
        endpoint: `http://${req.hostname}:3563/index.php/login/v2/poll`,
      },
      login: `http://localhost:5173/login/nextcloud/flow/v2/${authSessionToken}`,
    });

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
    console.log({ authSessionPollToken });
    const authSession = nextcloudAuthorisedSessions[authSessionPollToken];

    if (!authSession) {
      console.log("polled and found no session");
      return res.status(404).send("");
    }

    console.log("polled and found session", authSession);

    const dbQuery = sessionDatabase.query(`INSERT INTO Database (username, sessionToken) VALUES ($username, $sessionToken)`);
    dbQuery.run({ username: authSession.username, sessionToken: authSession.sessionToken });

    return res.json({
      server: `http://${req.hostname}:3563`,
      loginName: authSession.username,
      appPassword: authSession.sessionToken,
    });
  });

  core.request.post("/login/nextcloud/flow/v2/authenticate", async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ error: "Invalid or missing request body" });
    }

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
          function generateNextcloudBearerToken() {
            // format: "YWRtaW46NG4uRVU1XidvVTAsbi5VUH1vLFJiL1wxWGZySCtRKyRKcSZmdykpV3FuTjXCrCxHekRSQ09maSpzL01+JmV4eXNxTmZYUUV3OD48WTheU1NnfiV9ZFV8XFp4aE5fZldtSWU2XVRmYEZITTliM0NjPmowUUo4WSFmT1tkdlwwfixY"

            const characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890+";

            return Array.from({ length: 180 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
          }

          const session = await createSession(username, YOURDASH_SESSION_TYPE.NEXTCLOUD_COMPATABILITY, generateNextcloudBearerToken());

          /*
            token: session.sessionToken,
            // only used for the session's management page
            sessionId: session.sessionId,
          */

          console.log({ sessionToken: session.sessionToken });

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

  // @ts-ignore
  function getUserForRequest(req: ExpressRequest): YourDashUser {
    if (!req.headers.authorization) {
      console.log("We should not get here!!! getUserForRequest() // nextcloud");
      // @ts-ignore
      return;
    }

    // if we are using api v2 then the sessionToken is just the user's password
    function parseAuthorization(sessionToken: string): { username: string; sessionToken: string } {
      const tokenString = sessionToken.split("Basic ")[1];
      const tokenParsed = Buffer.from(tokenString, "base64").toString("utf-8");

      const parsedTokenValues = tokenParsed.split(":");

      const username = parsedTokenValues[0];
      const userPassword = parsedTokenValues[1];
      return { username: username, sessionToken: userPassword };
    }

    const reqAuth = parseAuthorization(req.headers.authorization);

    const dbQuery = sessionDatabase.query("SELECT username FROM Database WHERE sessionToken = $sessionToken");
    const dbResponse = dbQuery.get({ sessionToken: reqAuth.sessionToken });

    if (!dbResponse) {
      console.log("Invalid Session Token!");
      // @ts-ignore
      return;
    }

    if (!(dbResponse as { username?: string }).username) {
      console.log("Invalid Session, no username found!");
      // @ts-ignore
      return;
    }

    return core.users.get((dbResponse as { username: string }).username);
  }

  core.request.get("/ocs/v1.php/cloud/user", async (req, res) => {
    const user = getUserForRequest(req);
    const userFullName = (await user.getName()) || { first: "Unknown", last: "User" };

    return res.json({
      ocs: {
        meta: {
          status: "ok",
          statuscode: 100,
          message: "OK",
          totalitems: "",
          itemsperpage: "",
        },
        data: {
          enabled: true,
          storageLocation: path.join(core.fs.ROOT_PATH, user.getFsPath()),
          id: user.username,
          lastLogin: Date.now(),
          backend: "Database",
          subadmin: [],
          quota: {
            free: 100,
            used: 10,
            total: 1000,
            relative: 0.03,
            quota: -3,
          },
          manager: "",
          avatarScope: "v2-federated",
          email: null,
          emailScope: "v2-federated",
          aditional_mail: [],
          aditional_mailScope: [],
          displayname: `${userFullName.first} ${userFullName.last}`,
          "display-name": `${userFullName.first} ${userFullName.last}`,
          displaynameScope: "v2-federated",
          phone: "",
          phoneScope: "v2-local",
          address: "",
          addressScope: "v2-local",
          website: "",
          websiteScope: "v2-local",
          twitter: "",
          twitterScope: "v2-local",
          fediverse: "",
          fediverseScope: "v2-local",
          organisation: "",
          organisationScope: "v2-local",
          role: "",
          roleScope: "v2-local",
          headline: "",
          headlineScope: "v2-local",
          biography: "",
          biographyScope: "v2-local",
          profile_enabled: "1",
          profile_enabledScope: "v2-local",
          groups: ["admin"],
          language: "en_GB",
          locale: "",
          notify_email: null,
          backendCapabilities: {
            setDisplayName: true,
            setPassword: true,
          },
        },
      },
    });
  });

  core.request.get("/remote.php/dav/avatars/:username/*", async (req, res) => {
    const user = core.users.get(req.params.username);

    return res.sendFile(path.resolve(path.join(core.fs.ROOT_PATH, user.getAvatar(USER_AVATAR_SIZE.MEDIUM))));
  });

  /*   // handle nextcloud compatability authentication (remember the Bearer)
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
    console.log({ username: req.params.username, params: Object.values(req.params).join("/"), path: req.params["*"] });

    console.log(JSON.stringify(req.body));

    if (!req.body["d:propfind"]) {
      console.log("no d:propfind found!", req.body);
    }

    if (!req.body["d:propfind"]["d:prop"]) {
      console.log("no d:prop found!", req.body);
    }

    const props: object[] = req.body["d:propfind"]["d:prop"];

    const filePath = req.params["*"] === undefined ? "/" : req.params["*"];

    let response: string[] = [];

    Object.keys(props).forEach((prop: string) => {
      switch (prop) {
        case "d:getlastmodified":
          response.push(`<d:getlastmodified>FORMATTED LAST MODIFIED DATE</d:getlastmodified>`);
      }
    });

    return res.contentType("xml").status(207).send(`<?xml version="1.0"?>
<d:multistatus xmlns:d="DAV:" xmlns:s="http://sabredav.org/ns" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns">
<d:response>
<d:href>${req.path}</d:href>
<d:propstat>
${response.map((res) => {
  return `<d:prop>${res}</d:prop>`;
})}
<d:status>HTTP/1.1 200 OK</d:status>
</d:propstat>
</d:response>
</d:multistatus>`);
    //
    //     if (req.params["*"] === "/") {
    //       return res.contentType("xml").send(`<?xml version="1.0" encoding="utf-8"?>
    //       <d:error xmlns:d="DAV:" xmlns:s="http://sabredav.org/ns">
    //         <s:exception>Internal Server Error</s:exception>
    //         <s:message>The server was unable to complete your request.
    // If this happens again, please send the technical details below to the server administrator.
    // More details can be found in the server log.
    //         </s:message>
    //         <s:technical-details>
    //           <s:remote-address>::1</s:remote-address>
    //           <s:request-id>ibCxTsPl4KN7sufuReK6</s:request-id>
    //         </s:technical-details>
    //       </d:error>`);
    //     }
    //
    //     if (req.params["*"] === undefined) {
    //       return res.contentType("http/xml").send(`<?xml version="1.0" encoding="utf-8"?>
    // <d:multistatus xmlns:d="DAV:" xmlns:s="http://sabredav.org/ns" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns">
    //     <d:response>
    //         <d:href>${req.path}</d:href>
    //         <d:propstat>
    //             <d:prop>
    //                 <oc:size>10000</oc:size>
    //             </d:prop>
    //             <d:status>HTTP/1.1 200 OK</d:status>
    //         </d:propstat>
    //     </d:response>
    // </d:multistatus>
    // `);
    //     }

    return res.json({ error: true });
  });

  core.request.get("/remote.php/dav/avatars/:username/:size.png", async (req, res) => {
    const username = req.params.username;

    const user = core.users.get(username);

    if (!user) {
      return res.status(401).send("error");
    }

    return res.sendFile(path.join(this.fs.ROOT_PATH, user.getAvatar(USER_AVATAR_SIZE.SMALL, "png")));
  });
}
