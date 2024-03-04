/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import sharp from "sharp";
import coreApi from "../coreApi.js";
import fs from "fs"
import path from "path"

export default function generateInstanceLogos() {
  sharp(
    fs.readFileSync( path.join( coreApi.fs.ROOT_PATH, "./instance_logo.avif" ) ) )
    .resize( 31, 31 )
    .toFile( path.join( coreApi.fs.ROOT_PATH, "./logo_panel_small.avif" ) )
    .catch( err => {
      coreApi.log.error( `unable to create "fs/logo_panel_small.avif" ${ err }` );
    } );

  sharp(
    fs.readFileSync( path.join( coreApi.fs.ROOT_PATH, "./instance_logo.avif" ) ) )
    .resize( 39, 39 )
    .toFile( path.join( coreApi.fs.ROOT_PATH, "./logo_panel_medium.avif" ) )
    .catch( err => {
      coreApi.log.error( `unable to create "fs/logo_panel_medium.avif" ${ err }` );
    } );

  sharp(
    fs.readFileSync( path.join( coreApi.fs.ROOT_PATH, "./instance_logo.avif" ) ) )
    .resize( 55, 55 )
    .toFile( path.join( coreApi.fs.ROOT_PATH, "./logo_panel_large.avif" ) )
    .catch( err => {
      coreApi.log.error( `unable to create "fs/logo_panel_large.avif" ${ err }` );
    } );
}
