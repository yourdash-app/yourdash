/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export function generateRandomStringOfLength(length: number) {
  const characters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890-/+=_-~#@'!$%^&*(){}[]<>?¬`|\\.,:;";

  return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
}
