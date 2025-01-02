/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// YourDash WebDAV support

import { promises as fs } from "fs";
import path from "path";
import { parseStringPromise } from "xml2js";
import { Core } from "../core.js";
import z from "zod";

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

export default class coreWebDAV {
  core: Core;

  constructor(core: Core) {
    this.core = core;

    return this;
  }

  __internal__loadEndpoints() {
    this.core.request.setNamespace("");

    this.core.request.usePath("/.well-known/webdav", async (req, res) => {
      return res.redirect("/webdav");
    });

    this.core.request.usePath("/.well-known/caldav", async (req, res) => {
      return res.redirect("/webdav");
    });

    this.core.request.usePath("/.well-known/carddav", async (req, res) => {
      return res.redirect("/webdav");
    });

    this.core.request.get("/webdav", z.string(), async (_req, res) => {
      return res.send(`This is the WebDAV endpoint of YourDash`);
    });

    this.core.request.usePath("/webdav/*", async (req, res, next) => {
      res.setHeader("DAV", "1,2");
      res.setHeader("MS-Author-Via", "DAV");

      if (req.method === "OPTIONS") {
        res.setHeader("Allow", "GET, PUT, DELETE, MKCOL, OPTIONS, COPY, MOVE, PROPFIND, PROPPATCH, LOCK, UNLOCK, HEAD");
        res.setHeader("Content-Type", "httpd/unix-directory");
      }

      function failAuth() {
        console.warn("WEBDAV FAIL AUTH???");

        res.status(401);
        res.setHeader("WWW-Authenticate", 'Basic realm="YourDash"');
        return res.json({ error: "authorization fail" });
      }

      // Authorisation
      if (!req.headers["authorization"]) return failAuth();

      if (req.headers["authorization"].split(" ")[0] !== "Basic") {
        return failAuth();
      }

      const [username, password] = Buffer.from(req.headers["authorization"].split(" ")[1], "base64").toString("utf-8").split(":");

      this.core.log.debug("webdav", "username:", username, "password:", password);

      const user = this.core.users.get(username);

      const savedHashedPassword = (await fs.readFile(path.join(user.path, "core/password.enc"))).toString();

      if (!(await Bun.password.verify(password, savedHashedPassword))) {
        this.core.log.error("webdav", "passwords did not match!, password", password);
        return failAuth();
      }

      const reqXML = await parseStringPromise(req.body);
      console.log(reqXML);

      return next();
    });

    this.core.request.rawExpress.propfind("/webdav/files/:path", (req, res) => {
      const { path: reqPath } = req.params;

      // TODO: actually implement this
      return res.send(`PATH: ${reqPath}`);
    });
  }
}
