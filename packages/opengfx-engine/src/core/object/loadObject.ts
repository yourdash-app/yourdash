/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default async function loadObject( path: string ) {
  try {
    const obj = await import( path )
    
    const object = new Object()
    
    object.id = obj.id
    
    return object
  } catch ( e ) {
    return null;
  }
}
