import Token from "./token";
import defaultTheme from "./defaultTheme";

export default function renderTokens(htmlElement: HTMLDivElement, tokens: Token[]) {
  tokens.forEach(token => {
    const span = document.createElement("span");

    span.innerText = token.value;
    span.style.color = defaultTheme.tokenTypes[token.type];
    span.style.fontWeight = token.fontWeight;

    htmlElement.appendChild(span);
  });
  return 0;
}
