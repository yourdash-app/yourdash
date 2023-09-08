import defaultTheme from "./defaultTheme";
import Token from "./token";

export default function renderTokens( htmlElement: HTMLDivElement, tokens: Token[] ) {
  htmlElement.innerHTML = tokens.map( token => token.value ).join( "" );
  
  let output = "";
  
  tokens.forEach( token => {
    const tokenDiv = document.createElement( "span" );
    
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
    
    tokenDiv.textContent = token.value;
    tokenDiv.style.color = defaultTheme.tokenTypes[token.type] || "#555555";
    tokenDiv.style.fontWeight = token.fontWeight;
    
    output += tokenDiv.outerHTML;
  } );
  
  htmlElement.innerHTML = output;
  
  return 0;
}
