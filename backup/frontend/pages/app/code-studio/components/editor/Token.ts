import { type TokenTypes } from "./Tokens";

export interface Token {
  content: string,
  type: TokenTypes
}
