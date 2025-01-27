/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

export type KeysStartingWith<T, Prefix extends string> = {
  [K in keyof T]: K extends `${Prefix}${string}` ? K : never;
}[keyof T];
