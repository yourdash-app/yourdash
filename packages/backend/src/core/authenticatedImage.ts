import { Application as ExpressApplication } from "express";
import path from "path";
import crypto from "crypto";

export enum authenticatedImageType {
  base64,
  file
}

const authenticatedImages: {
  [ username: string ]: {
    [ id: string ]: {
      type: authenticatedImageType,
      value: string
    }
  }
} = {};

export function startAuthenticatedImageHelper( app: ExpressApplication ) {
  app.get( "/core/authenticated-img/:username/:id", ( req, res ) => {
    const {
      username,
      id
    } = req.params;
    
    const image = authenticatedImages?.[username]?.[id];
    
    if ( !image ) {
      return res.sendFile( path.resolve( process.cwd(), "./src/assets/default_avatar.avif" ) );
    }
    
    if ( image.type === authenticatedImageType.base64 ) {
      const buf = Buffer.from( image.value, "base64" );
      return res.send( buf );
    }
    
    if ( image.type === authenticatedImageType.file ) {
      return res.sendFile( image.value );
    }
    
    return res.sendFile( path.resolve( process.cwd(), "./src/assets/default_avatar.avif" ) );
  } );
}

export default function authenticatedImage( username: string, type: authenticatedImageType, value: string ): string {
  const id = crypto.randomUUID()
  
  if ( !authenticatedImages[username] ) {
    authenticatedImages[username] = {};
  }
  
  authenticatedImages[username][id] = {
    type,
    value
  };
  
  return `/core/authenticated-img/${ username }/${ id }`;
}

// TODO: implement this
// export function authenticatedImagePreProcess( username: string, type: authenticatedImageType, value: () => string ): string {
//   const id = Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 );
//
//   if ( !authenticatedImages[username] ) {
//     authenticatedImages[username] = {};
//   }
//
//   authenticatedImages[username][id] = {
//     type,
//     value
//   };
//
//   return `/core/authenticated-img/${ username }/${ id }`;
// }
