import { Application as ExpressApplication } from "express";
import YourDashUnreadUser from "backend/src/helpers/user.js";
import log, { LOG_TYPES } from "backend/src/helpers/log.js";
import { compareHash } from "backend/src/helpers/encryption.js";
import { createSession } from "backend/src/helpers/session.js";
import { YourDashSessionType } from "../../../../shared/core/session.js";
import { __internalGetSessionsDoNotUseOutsideOfCore } from "../sessions.js";
import path from "path";
import { promises as fs } from "fs";

export default function defineLoginEndpoints( app: ExpressApplication ) {
  app.get(
    "/core/login/background",
    ( _req, res ) => {
      res.set( "Content-Type", "image/avif" );
      return res.sendFile( path.resolve(
        process.cwd(),
        "./fs/login_background.avif"
      ) );
    }
  );

  app.get( "/core/login/user/:username/avatar", ( req, res ) => {
    const user = new YourDashUnreadUser( req.params.username );
    return res.sendFile( path.resolve( user.getPath(), "avatar.avif" ) );
  } );

  app.get( "/core/login/user/:username", async ( req, res ) => {
    const user = new YourDashUnreadUser( req.params.username );
    if ( await user.exists() ) {
      return res.json( { name: ( await user.read() ).getName() } );
    } else {
      return res.json( { error: "Unknown user" } );
    }
  } );

  app.post( "/core/login/user/:username/authenticate", async ( req, res ) => {
    const username = req.params.username;
    const password = req.body.password;

    if ( !username || username === "" ) {
      return res.json( { error: "Missing username" } );
    }

    if ( !password || password === "" ) {
      return res.json( { error: "Missing password" } );
    }

    const user = new YourDashUnreadUser( username );

    const savedHashedPassword = ( await fs.readFile( path.resolve( user.getPath(), "./password.txt" ) ) ).toString();

    log( LOG_TYPES.INFO, savedHashedPassword );
    log( LOG_TYPES.INFO, password );

    return compareHash( savedHashedPassword, password ).then( async result => {
      if ( result ) {
        const session = await createSession(
          username,
          req.headers?.type === "desktop"
            ? YourDashSessionType.desktop
            : YourDashSessionType.web
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

  app.get( "/core/login/is-authenticated", async ( req, res ) => {
    const {
      username,
      token
    } = req.headers as {
      username?: string;
      token?: string;
    };

    if ( !username || !token ) {
      return res.json( { error: true } );
    }

    if ( !__internalGetSessionsDoNotUseOutsideOfCore()[username] ) {
      try {
        const user = await ( new YourDashUnreadUser( username ).read() );

        __internalGetSessionsDoNotUseOutsideOfCore()[username] = ( await user.getSessions() ) || [];
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

}
