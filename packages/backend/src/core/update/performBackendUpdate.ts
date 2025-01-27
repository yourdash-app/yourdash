/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { spawn } from "node:child_process";
import path from "path";
import core from "../core.js";

export async function performBackendUpdate() {
  // spawn a new process to perform the update and restart yourdash
  const gitProcess = spawn("git", ["pull"], { cwd: path.join(process.cwd(), "..") });

  gitProcess.stderr.on("data", (data) => {
    core.log.error("core_perform_backend_update", data.toString());
  });

  gitProcess.on("close", () => {
    if (gitProcess.stdout.find((str) => str.includes("Already up to date."))) {
      core.log.info("core_perform_backend_update", "Already up to date!");
    }

    core.log.info("core_perform_backend_update", "Updated!");
    core.shutdownInstance();
  });
}

export default function scheduleBackendUpdateChecker() {
  core.scheduler.scheduleTask("core_perform_backend_update", "0 0 * * *" /* at 00:00 every day */, async () => {
    await performBackendUpdate();
  });
}
