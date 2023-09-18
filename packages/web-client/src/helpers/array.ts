/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export function chunk( array: any[], multipleOf: number ): any[][] {
  const output = []
  for ( let i = 0; i < array.length; i += multipleOf ) {
    output.push( array.slice( i, i + multipleOf ) )
  }
  return output
}
