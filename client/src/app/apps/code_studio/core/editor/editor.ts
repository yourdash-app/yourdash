import KeyboardInputManager from "./keyboardManager";
import {CodeStudioFileTypes} from "./fileTypes";
import CodeStudioBaseLanguageParser from "./languageParser/parser";
import renderTokens from "./languageParser/renderTokens";

export default class CodeStudioEditor {
  keyboardInputManager: KeyboardInputManager;
  htmlContainer: HTMLDivElement;

  constructor(containerElement: HTMLDivElement) {
    this.keyboardInputManager = new KeyboardInputManager();
    this.htmlContainer = containerElement;

    return this;
  }

  // TODO: implement ME
  loadRawCode(fileName: string, fileType: CodeStudioFileTypes, rawCode: string) {
    return;
  }

  _debugRenderParsedString(string: string, parser: CodeStudioBaseLanguageParser) {
    const parsedResult = parser.parseString(string);
    console.log(parsedResult.parsedTokens);
    console.log(`Token count: ${ parsedResult.parsedTokens.length }`);
    this.htmlContainer.innerHTML = `
      <div>
        <pre><code style="font-family:'Jetbrains Mono'">${ string }\n\n</code></pre>
        <pre><code id="cs-test-output" style="font-family:'Jetbrains Mono'"></code></pre>
        <pre><code style="font-family:'Jetbrains Mono'">\n${ /* eslint-disable-line no-magic-numbers */ JSON.stringify(parsedResult, null, 2) }</code></pre>
      </div>
    `;
    if (document.getElementById("cs-test-output")) {
      renderTokens(document.getElementById("cs-test-output") as HTMLDivElement, parsedResult.parsedTokens);
    }
  }
}
