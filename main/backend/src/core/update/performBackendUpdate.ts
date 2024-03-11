/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { spawn } from "node:child_process";
import path from "path";
import coreApi from "../coreApi.js";

export async function performBackendUpdate() {
  // spawn a new process to perform the update and restart yourdash
  const gitProcess = spawn( "git", ["pull"], { cwd: path.join( process.cwd(), ".." ) } )

  gitProcess.stderr.on( "data", ( data ) => {
    coreApi.log.error( "core:perform_backend_update", data.toString() )
  } )

  gitProcess.on( "close", () => {
    if( gitProcess.stdout.find( str => str.includes( "Already up to date." ) ) ) {
      coreApi.log.info( "core:perform_backend_update", "Already up to date!" )
    }

    coreApi.log.info( "core:perform_backend_update", "Updated!" )
    coreApi.shutdownInstance()
  } )
}

export default function scheduleBackendUpdateChecker() {
  coreApi.scheduler.scheduleTask( "core:perform_backend_update", "0 0 * * *" /* at 00:00 every day */, async () => {
    await performBackendUpdate()
  } )
}
