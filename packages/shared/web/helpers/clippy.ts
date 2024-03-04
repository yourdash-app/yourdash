/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clsx from "clsx";

export default function clippy(...input: (string | undefined | null | boolean)[]): string {
  return clsx(...input)
    .replaceAll(`\n`, ``)
    .split(" ")
    .filter((str) => str !== "")
    .join(" ");
}
