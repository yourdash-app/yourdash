/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import styles from "./token.module.scss";

export enum TokenType {
  STRING,
  NUMBER,
  KEYWORD,
  PUNCTUATION,
  OPERATOR,
  COMMENT,
  PARAMETER,
  VARIABLE,
  FUNCTION,
  TYPE,
  OTHER,
  PARSE_FAILURE,
}

export default class Token {
  type: TokenType;
  content: string;
  position: { col: number; row: number };
  overrides?: {
    color: string;
    background: string;
  };

  constructor(
    content: Token["content"],
    type: Token["type"],
    position: Token["position"],
    overrides?: Token["overrides"],
  ) {
    this.content = content;
    this.type = type;
    this.position = position;
    this.overrides = overrides;

    return this;
  }

  render(): string {
    const domNode = document.createElement("span");

    switch (this.type) {
      case TokenType.OTHER:
        domNode.classList.add(styles.other);
        break;
      case TokenType.FUNCTION:
        domNode.classList.add(styles.function);
        break;
      case TokenType.PARAMETER:
        domNode.classList.add(styles.parameter);
        break;
      case TokenType.VARIABLE:
        domNode.classList.add(styles.variable);
        break;
      case TokenType.TYPE:
        domNode.classList.add(styles.type);
        break;
      case TokenType.OPERATOR:
        domNode.classList.add(styles.operator);
        break;
      case TokenType.PUNCTUATION:
        domNode.classList.add(styles.punctuation);
        break;
      case TokenType.KEYWORD:
        domNode.classList.add(styles.keyword);
        break;
      case TokenType.COMMENT:
        domNode.classList.add(styles.comment);
        break;
      case TokenType.STRING:
        domNode.classList.add(styles.string);
        break;
      case TokenType.NUMBER:
        domNode.classList.add(styles.number);
        break;
      case TokenType.PARSE_FAILURE:
        domNode.classList.add(styles.parseFailure);
        break;
    }

    domNode.innerText = this.content;

    if (this.overrides?.background)
      domNode.style.backgroundColor = this.overrides.background;

    if (this.overrides?.color) domNode.style.color = this.overrides.color;

    return domNode.outerHTML;
  }
}
