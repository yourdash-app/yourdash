/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import styles from "./token.module.scss";

export enum TokenType {
  STRING = 1,
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
  XML_TAG,
  XML_ATTRIBUTE_KEY,
  XML_ATTRIBUTE_VALUE,
}

export default class Token {
  type: TokenType | string;
  content: string;
  position: { col: number; row: number };
  overrides?: {
    color: string;
    background: string;
  };

  constructor(content: Token["content"], type: Token["type"], position: Token["position"], overrides?: Token["overrides"]) {
    this.content = content;
    this.type = type;
    this.position = position;
    this.overrides = overrides;

    return this;
  }

  render(): string {
    const domNode = document.createElement("div");

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
        console.log(this);
        domNode.classList.add(styles.string);
        break;
      case TokenType.NUMBER:
        domNode.classList.add(styles.number);
        break;
      case TokenType.XML_TAG:
        domNode.classList.add(styles.xmlTag);
        break;
      case TokenType.XML_ATTRIBUTE_KEY:
        domNode.classList.add(styles.xmlAttributeKey);
        break;
      case TokenType.XML_ATTRIBUTE_VALUE:
        domNode.classList.add(styles.xmlAttributeValue);
        break;
      case TokenType.PARSE_FAILURE:
        domNode.classList.add(styles.parseFailure);
        break;
      default:
        domNode.innerText = `<<${this.type}>>`;
        domNode.classList.add(styles.parseFailure);
        break;
    }

    domNode.classList.add(styles.token);
    domNode.innerText += this.content;

    if (this.overrides?.background) domNode.style.backgroundColor = this.overrides.background;

    if (this.overrides?.color) domNode.style.color = this.overrides.color;

    return domNode.outerHTML;
  }
}
