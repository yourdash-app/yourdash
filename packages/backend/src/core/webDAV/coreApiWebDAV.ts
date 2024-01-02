/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// YourDash WebDAV support

import { CoreApi } from "../coreApi.js";

export enum NAMESPACE {
  WEBDAV = "DAV:",
  CALDAV = "urn:ietf:params:xml:ns:caldav",
  CARDDAV = "urn:ietf:params:xml:ns:carddav",
  APPLE_ICAL = "http://apple.com/ns/ical/",
  CALENDARSERVER = "http://calendarserver.org/ns/",
}

// read://http_www.webdav.org/specs/rfc4918.html/?url=http%3A%2F%2Fwww.webdav.org%2Fspecs%2Frfc4918.html%23METHOD_PROPPATCH#METHOD_PROPPATCH
// Sample implementation => https://github.com/nfarina/simpledav/blob/master/wsgi.py

export default class CoreApiWebDAV {
  coreApi: CoreApi;

  constructor(coreApi: CoreApi) {
    this.coreApi = coreApi;
  }

  __internal__loadEndpoints() {
    this.coreApi.expressServer.get("/.well-known/caldav", (req, res) => {
      return res.send("CalDAV server");
    });

    this.coreApi.expressServer.get("/.well-known/carddav", (req, res) => {
      return res.send("CardDAV server");
    });

    this.coreApi.expressServer.proppatch("/webdav", (req, res) => {
      // TODO: remove the documentation response and respond as according to doc
      return res.send(`
        HTTP/1.1 207 Multi-Status
  Content-Type: application/xml; charset="utf-8"
  Content-Length: xxxx

  <?xml version="1.0" encoding="utf-8" ?>
  <D:multistatus xmlns:D="DAV:"
          xmlns:Z="http://ns.example.com/standards/z39.50/">
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
