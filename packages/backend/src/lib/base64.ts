/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export function base64ToDataUrl(string: string): string {
  return `data:image/avif;base64,${string}`;
}

export function dataUrlToBase64(string: string): string {
  return string.slice(23);
}
