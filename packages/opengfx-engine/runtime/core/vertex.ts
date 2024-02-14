/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default function vertexHelper( position: { x: number, y: number, z: number, w: number }, color: { red: number, green: number, blue: number, alpha: number} ) {
  return [ position.x, position.y, position.z, position.w, color.red, color.green, color.blue, color.alpha ]
}
