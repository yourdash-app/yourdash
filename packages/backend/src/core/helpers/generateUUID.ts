/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import crypto from "node:crypto";

export default function generateUUID(): string {
  return crypto.randomUUID();
}
