/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import bcrypt from "bcrypt";

export function generateRandomStringOfLength(length: number) {
  const characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890-/+=_-~#@'!$%^&*(){}[]<>?¬`|\\.,:;";

  return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
}

export function hashString(input: string): Promise<string> {
  return new Promise((resolve) => {
    const saltRounds = 10;
    bcrypt.hash(input, saltRounds, (err, hash) => {
      if (err) {
        console.error(err);
      }

      resolve(hash);
    });
  });
}

export function compareHashString(hash: string, input: string): Promise<boolean> {
  return new Promise((resolve) => {
    bcrypt.compare(input, hash, (err, response) => {
      if (err) {
        console.error(err);
      }

      resolve(response);
    });
  });
}
