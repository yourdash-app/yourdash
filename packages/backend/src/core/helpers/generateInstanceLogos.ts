/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import sharp from "sharp";
import core from "../core.js";
import fs from "fs";
import path from "path";

export default function generateInstanceLogos() {
  sharp(fs.readFileSync(path.join(core.fs.ROOT_PATH, "./instance_logo.avif")))
    .resize(31, 31)
    .toFile(path.join(core.fs.ROOT_PATH, "./logo_panel_small.avif"))
    .catch((err: string) => {
      core.log.error("core_generate_instance_logos", `unable to create "fs/logo_panel_small.avif" ${err}`);
    });

  sharp(fs.readFileSync(path.join(core.fs.ROOT_PATH, "./instance_logo.avif")))
    .resize(39, 39)
    .toFile(path.join(core.fs.ROOT_PATH, "./logo_panel_medium.avif"))
    .catch((err: string) => {
      core.log.error("core_generate_instance_logos", `unable to create "fs/logo_panel_medium.avif" ${err}`);
    });

  sharp(fs.readFileSync(path.join(core.fs.ROOT_PATH, "./instance_logo.avif")))
    .resize(55, 55)
    .toFile(path.join(core.fs.ROOT_PATH, "./logo_panel_large.avif"))
    .catch((err: string) => {
      core.log.error("core_generate_instance_logos", `unable to create "fs/logo_panel_large.avif" ${err}`);
    });
}
