/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function( c ) {
    const r = Math.random() * 16 | 0, v = c == "x" ? r : ( r & 0x3 | 0x8 );
    return v.toString( 16 );
  } );
}
