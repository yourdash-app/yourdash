/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function chunk<T>( array: T[], multipleOf: number ): T[][] {
  const output = []
  for ( let i = 0; i < array.length; i += multipleOf ) {
    output.push( array.slice( i, i + multipleOf ) )
  }
  return output
}
