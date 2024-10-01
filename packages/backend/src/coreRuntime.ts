/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

/**
 * # The YourDash project
 *  - https://github.com/yourdash/yourdash
 *  - https://yourdash.ewsgit.uk
 *  - https://ydsh.pages.dev
 */

import core from "./core/core.js";

console.log("AHH");

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
