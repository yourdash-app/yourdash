/*
* Copyright ©2023 @Ewsgit and YourDash contributors.
* YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
*/

/*
* # The YourDash project
*  - https://github.com/yourdash-app/yourdash
*  - https://yourdash.pages.dev
*  - https://ydsh.pages.dev
*
* # ----- Server Startup steps -----
* 1. Fetch process arguments
* 2. Load the global database
* 3. Init express
* 4. Load authentication service
* 5. Start core services
* 6. Begin listening for requests
* 7. Start startup services
*    - request logger
*    - authenticated image
*    - user sanitization
*    - caching service
* 8. Load applications
* 9. Load post-startup services
*/

import sourceMapSupport from "source-map-support";
import coreApi from "./core/coreApi.js";

sourceMapSupport.install();

try {
  // Start the YourDash Instance
  coreApi.__internal__startInstance()
} catch( err )  {
  coreApi.log.error( "core", `An error occurred with YourDash startup: ${ err }` )
}

/*
// if we are not running in development mode, start the check for updates task
if ( !PROCESS_ARGUMENTS.dev ) {
  scheduleBackendUpdateChecker();
}
*/
