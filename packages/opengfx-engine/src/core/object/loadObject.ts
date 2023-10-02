/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import GFXObject from "./object.ts";

export default async function loadObject( path: string ) {
  try {
    const obj = await import( path )
    
    const object = new GFXObject( obj.screen, obj.parentContainer, obj.engine )
    
    object.id = obj.id
    
    return object
  } catch ( e ) {
    return null;
  }
}
