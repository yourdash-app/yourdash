/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// YourDash WebDAV support

import { promises as fs } from "fs";
import path from "path";
import { compareHashString } from "../../helpers/encryption.js";
import { CoreApi } from "../coreApi.js";

export enum WD_NAMESPACE {
  WEBDAV = "DAV:",
  CALDAV = "urn:ietf:params:xml:ns:caldav",
  CARDDAV = "urn:ietf:params:xml:ns:carddav",
  APPLE_ICAL = "http://apple.com/ns/ical/",
  CALENDARSERVER = "http://calendarserver.org/ns/",
}

// read://http_www.webdav.org/specs/rfc4918.html/?url=http%3A%2F%2Fwww.webdav.org%2Fspecs%2Frfc4918.html%23METHOD_PROPPATCH#METHOD_PROPPATCH
// Sample implementation => https://github.com/nfarina/simpledav/blob/master/wsgi.py
// https://datatracker.ietf.org/doc/html/rfc6764#section-5

export default class CoreApiWebDAV {
  coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;

    const SAMPLE_XML = `<?xml version="1.0" encoding="utf-8"?>
    <d:prop xmlns:d="DAV:">
      <d:getetag />
    </d:prop>`;

    console.log();
  }

  __internal__loadEndpoints() {
    this.coreApi.expressServer.use("/.well-known/webdav", (req, res) => {
      return res.redirect("/webdav");
    });

    this.coreApi.expressServer.use("/.well-known/caldav", (req, res) => {
      return res.redirect("/webdav");
    });

    this.coreApi.expressServer.use("/.well-known/carddav", (req, res) => {
      return res.redirect("/webdav");
    });

    this.coreApi.expressServer.use("/webdav", async (req, res, next) => {
      res.setHeader("DAV", "1,2");
      res.setHeader("MS-Author-Via", "DAV");

      if (req.method === "OPTIONS") {
        res.setHeader(
          "Allow",
          "GET, PUT, DELETE, MKCOL, OPTIONS, COPY, MOVE, PROPFIND, PROPPATCH, LOCK, UNLOCK, HEAD",
        );
        res.setHeader("Content-Type", "httpd/unix-directory");
      }

      function failAuth() {
        res.status(401);
        res.setHeader("WWW-Authenticate", 'Basic realm="YourDash"');
        return res.json({ error: "authorization fail" });
      }

      // Authorisation
      if (!req.headers["authorization"]) return failAuth();

      if (req.headers["authorization"].split(" ")[0] !== "Basic") {
        return failAuth();
      }

      const [username, password] = Buffer.from(
        req.headers["authorization"].split(" ")[1],
        "base64",
      )
        .toString("utf-8")
        .split(":");

      this.coreApi.log.debug(
        "webdav",
        "username:",
        username,
        "password:",
        password,
      );

      const user = this.coreApi.users.get(username);

      const savedHashedPassword = (
        await fs.readFile(path.join(user.path, "core/password.enc"))
      ).toString();

      if (!(await compareHashString(savedHashedPassword, password))) {
        this.coreApi.log.error(
          "webdav",
          "passwords did not match!, password",
          password,
        );
        return failAuth();
      }

      // TODO: remove the documentation response and respond as according to doc
      return res.send(`
<?xml version="1.0" encoding="utf-8" ?>
<D:multistatus xmlns:D="DAV:" xmlns:Z="http://ns.example.com/standards/z39.50/">
  <D:response>
    <D:href>http://www.example.com/bar.html</D:href>
    <D:propstat>
      <D:prop><Z:Authors/></D:prop>
      <D:status>HTTP/1.1 424 Failed Dependency</D:status>
    </D:propstat>
    <D:propstat>
      <D:prop><Z:Copyright-Owner/></D:prop>
      <D:status>HTTP/1.1 409 Conflict</D:status>
    </D:propstat>
    <D:responsedescription> Copyright Owner cannot be deleted or
      altered.</D:responsedescription>
  </D:response>
</D:multistatus>
  `);
    });
  }
}
