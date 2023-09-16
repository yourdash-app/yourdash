/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import defaultTheme from "./defaultTheme";
import { TokenType } from "./tokenType";

export enum FontWeight {
  Normal,
  Bold,
  Bolder,
  Lighter
}

export enum TextDecoration {
  None,
  Underline,
  Overline,
  LineThrough
}

export default class Token {
  type: TokenType;
  value: string;
  textDecoration?: string;
  errorMessage?: string;
  warningMessage?: string;
  weakWarningMessage?: string;
  infoMessage?: string;
  fontWeight: string;
  
  constructor(
    value: string,
    type: TokenType,
    textDecoration?: string,
    errorMessage?: string,
    warningMessage?: string,
    weakWarningMessage?: string,
    infoMessage?: string,
    fontWeight?: string
  ) {
    this.value = value;
    this.type = type;
    this.textDecoration = textDecoration;
    this.errorMessage = errorMessage;
    this.warningMessage = warningMessage;
    this.weakWarningMessage = weakWarningMessage;
    this.infoMessage = infoMessage;
    this.fontWeight = fontWeight || "400";
  }
}
