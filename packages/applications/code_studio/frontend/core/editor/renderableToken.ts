/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
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
