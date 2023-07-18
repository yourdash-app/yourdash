import Token from "./token";
import defaultTheme from "./defaultTheme";

export default function renderTokens( htmlElement: HTMLDivElement, tokens: Token[] ) {
  htmlElement.innerHTML = "";
  
  tokens.forEach( token => {
    const tokenDiv = document.createElement( "span" );
    
    tokenDiv.innerText = token.value;
    tokenDiv.style.color = defaultTheme.tokenTypes[token.type];
    tokenDiv.style.fontWeight = token.fontWeight;
    
    // if ( token.errorMessage ) {
    //   tokenDiv.style.position = "relative";
    //   tokenDiv.style.borderBottom = "1px solid red";
    //   tokenDiv.style.display = "flex";
    //   tokenDiv.style.flexGrow = "0";
    //   tokenDiv.style.flexShrink = "0";
    //   const element = document.createElement( "div" );
    //   element.innerText = ` <-- ${token.errorMessage}`;
    //   element.style.color = "red";
    //   tokenDiv.appendChild( element );
    // }
    
    htmlElement.appendChild( tokenDiv );
  } );
  return 0;
}
