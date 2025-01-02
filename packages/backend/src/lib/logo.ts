/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import fs from "fs";
import path from "path";
import core from "../core/core.js";

export function getInstanceLogoBase64(): string {
  return fs.readFileSync(path.join(core.fs.ROOT_PATH, "./instance_logo.avif")).toString("base64");
}
