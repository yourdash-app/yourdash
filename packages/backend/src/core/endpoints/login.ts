/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import YourDashUser from "backend/src/core/user/index.js";
import { compareHash } from "backend/src/helpers/encryption.js";
import log, { logType } from "backend/src/helpers/log.js";
import { createSession } from "backend/src/helpers/session.js";
import { Application as ExpressApplication } from "express";
import { promises as fs } from "fs";
import path from "path";
import { YOURDASH_SESSION_TYPE } from "shared/core/session.js";
import GlobalDatabase from "../../helpers/globalDatabase.js";
import { __internalGetSessionsDoNotUseOutsideOfCore } from "../session.js";
import { userAvatarSize } from "../user/avatarSize.js";

export default function defineLoginEndpoints( exp: ExpressApplication ) {
  exp.get( "/core/login/user/:username/avatar", ( req, res ) => {
    const user = new YourDashUser( req.params.username );
    return res.sendFile( user.getAvatar( userAvatarSize.LARGE ) );
  } );

  exp.get( "/core/login/user/:username", async ( req, res ) => {
    const user = new YourDashUser( req.params.username );
    if ( await user.doesExist() ) {
      return res.json( { name: await user.getName() } );
    } else {
      return res.json( { error: "Unknown user" } );
    }
  } );

  exp.post( "/core/login/user/:username/authenticate", async ( req, res ) => {
    const username = req.params.username;
    const password = req.body.password;

    if ( !username || username === "" ) {
      return res.json( { error: "Missing username" } );
    }

    if ( !password || password === "" ) {
      return res.json( { error: "Missing password" } );
    }

    const user = new YourDashUser( username );

    const savedHashedPassword = ( await fs.readFile( path.join( user.path, "core/password.enc" ) ) ).toString();

    return compareHash( savedHashedPassword, password ).then( async result => {
      if ( result ) {
        const session = await createSession(
          username,
          req.headers?.type === "desktop"
            ? YOURDASH_SESSION_TYPE.desktop
            : YOURDASH_SESSION_TYPE.web
        );
        return res.json( {
          token: session.sessionToken,
          id: session.id
        } );
      } else {
        return res.json( { error: "Incorrect password" } );
      }
    } ).catch( () => res.json( { error: "Hash comparison failure" } ) );
  } );

  exp.get( "/core/login/is-authenticated", async ( req, res ) => {
    const { username, token } = req.headers as { username?: string, token?: string };

    if ( !username || !token )
      return res.json( { error: true } );

    if ( !__internalGetSessionsDoNotUseOutsideOfCore()[username] ) {
      try {
        const user = new YourDashUser( username );

        // ! FIXME: This appear to be strange behaviour
        __internalGetSessionsDoNotUseOutsideOfCore()[username] = ( await user.getAllLoginSessions() ) || [];
      } catch ( _err ) {
        return res.json( { error: true } );
      }
    }

    if (
      __internalGetSessionsDoNotUseOutsideOfCore()[username].find( session => session.sessionToken === token )
    ) {
      return res.json( { success: true } );
    }
    return res.json( { error: true } );
  } );

  exp.get( "/core/login/instance/metadata", ( req, res ) => {
    return res.json( {
      title: GlobalDatabase.get( "core:instance:name" ) || "Placeholder name",
      message: GlobalDatabase.get( "core:login:message" ) || "Placeholder message, hey system admin, you should change this!",
    } )
  } )
  
  exp.get(
    "/core/login/instance/background",
    ( _req, res ) => {
      res.set( "Content-Type", "image/avif" );
      return res.sendFile( path.resolve(
        process.cwd(),
        "./fs/login_background.avif"
      ) );
    }
  );
}
