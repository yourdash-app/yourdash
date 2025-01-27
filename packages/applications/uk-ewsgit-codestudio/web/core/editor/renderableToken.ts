/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default interface CodeStudioRenderableToken {
  content: string;
  style: {
    italic: boolean;
    bold: boolean;
    color: string;
  };
}
