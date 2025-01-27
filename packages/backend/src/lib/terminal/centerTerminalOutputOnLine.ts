/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { getTerminalWidth } from "./terminalWindow.js";

export default function centerTerminalOutputOnLine(string: string): string {
  const TERMINAL_WIDTH = getTerminalWidth();
  const STRING_LENGTH = string.length;
  const LINE_SIZE = (TERMINAL_WIDTH - (STRING_LENGTH + 12)) / 2;

  let output = "";

  for (let i = 0; i < LINE_SIZE; i++) output += "-";

  output += ` ${string} `;

  for (let i = 0; i < LINE_SIZE; i++) output += "-";

  return output;
}
