/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export type TypeFromString<T extends string> = T extends "string"
  ? string
  : T extends "number"
    ? number
    : T extends "boolean"
      ? boolean
      : T extends "bigint"
        ? bigint
        : T extends "symbol"
          ? symbol
          : T extends "undefined"
            ? undefined
            : T extends "object"
              ? object
              : never;
