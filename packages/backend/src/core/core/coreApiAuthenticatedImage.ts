/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import crypto from "crypto";
import path from "path";
import { CoreApi } from "./coreApi.js";

export enum authenticatedImageType {
  BASE64, FILE
}

export default class CoreApiAuthenticatedImage {
  private coreApi: CoreApi;
  private readonly AUTHENTICATED_IMAGES: {
    [ username: string ]: {
      [ id: string ]: {
        type: authenticatedImageType,
        value: string
      }
    }
  };

  constructor( coreApi: CoreApi ) {
    this.coreApi = coreApi;
    this.AUTHENTICATED_IMAGES = {}
  }

  create( username: string, type: authenticatedImageType, value: string ): string {
    const id = crypto.randomUUID()

    if ( !this.AUTHENTICATED_IMAGES[username] ) {
      this.AUTHENTICATED_IMAGES[username] = {};
    }

    this.AUTHENTICATED_IMAGES[username][id] = {
      type,
      value
    };

    return `/core/authenticated-img/${ username }/${ id }`;
  }

  __internal__loadEndpoints() {
    this.coreApi.expressServer.get( "/core/authenticated-img/:username/:id", ( req, res ) => {
      const { username, id } = req.params;

      const image = this.AUTHENTICATED_IMAGES?.[ username ]?.[ id ];

      if ( !image ) {
        return res.sendFile( path.resolve( process.cwd(), "./src/defaults/default_avatar.avif" ) );
      }

      if ( image.type === authenticatedImageType.BASE64 ) {
        const buf = Buffer.from( image.value, "base64" );
        return res.send( buf );
      }

      if ( image.type === authenticatedImageType.FILE ) {
        return res.sendFile( image.value );
      }

      return res.sendFile( path.resolve( process.cwd(), "./src/defaults/default_avatar.avif" ) );
    } );
  }
}
