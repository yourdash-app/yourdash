/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

/**
 * # The YourDash project
 *  - https://github.com/yourdash/yourdash
 *  - https://yourdash.pages.dev
 *  - https://ydsh.pages.dev
 */

import core from "./core/core.js";

try {
  // Start the YourDash Instance
  core.__internal__startInstance();
} catch (err) {
  core.log.error("core", `An error occurred with YourDash startup: ${err}`);
}

/*
// if we are not running in development mode, start the check for updates task
if ( !PROCESS_ARGUMENTS.dev ) {
  scheduleBackendUpdateChecker();
}
*/
