/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export const INTERPOLATE_EASE_IN_OUT = 0.5

// graph-based interpolation
export default function gerp( a: number, b: number, t: number ): number {
  return a + ( b - a ) * t
}
