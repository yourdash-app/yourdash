/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import fs from "fs";
import path from "path";
import coreApi from "../core/core/coreApi.js";

export function getInstanceLogoBase64(): string {
  return fs.readFileSync( path.join( coreApi.fs.ROOT_PATH, "./instance_logo.avif" ) ).toString( "base64" );
}
