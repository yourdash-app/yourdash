enum TokenType {
  Identifier,
  Keyword,
  String,
  Number,
  Operator,
  Punctuation
}

enum FontWeight {
  Normal,
  Bold,
  Bolder,
  Lighter
}

enum TextDecoration {
  None,
  Underline,
  Overline,
  LineThrough
}

export default class Token {
  type: TokenType;
  value: string;
  color: string;
  font: string;
  textDecoration?: string;
  errorMessage?: string;
  warningMessage?: string;
  weakWarningMessage?: string;
  infoMessage?: string;
  fontWeight: string;

  constructor(
    value: string,
    type: TokenType,
    color: string,
    font: string,
    textDecoration?: string,
    errorMessage?: string,
    warningMessage?: string,
    weakWarningMessage?: string,
    infoMessage?: string,
    fontWeight?: string
  ) {
    this.value = value;
    this.type = type;
    this.color = color;
    this.font = font;
    this.textDecoration = textDecoration;
    this.errorMessage = errorMessage;
    this.warningMessage = warningMessage;
    this.weakWarningMessage = weakWarningMessage;
    this.infoMessage = infoMessage;
    this.fontWeight = fontWeight || "400";
  }

  render() {
    const tokenSpan = document.createElement("span");

    tokenSpan.textContent = this.value;
    tokenSpan.style.color = this.color;
    tokenSpan.style.font = this.font;
    tokenSpan.style.fontWeight = "400";

    return tokenSpan;
  }
}
