/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export function getTerminalWidth(): number {
  return process.stdout.columns || 80
}

export function getTerminalHeight(): number {
  return process.stdout.rows || 100
}