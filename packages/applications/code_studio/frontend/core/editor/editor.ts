/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KeyboardInputManager from "./keyboardManager";
import TreeSitterParser from "web-tree-sitter";
import styles from "./editor.module.scss";
import CodeStudioLanguage from "./languages/language";
import CodeStudioLanguages from "./languages/languages";
import Token from "./token/token";
// @ts-ignore
import TREESITTER_WASM from "./tree-sitter.wasm?url";
// @ts-ignore
import TREESITTER_PLAINTEXT_WASM from "./languages/markdown/markdown.wasm?url";

export default class CodeStudioEditor {
  keyboardInputManager: KeyboardInputManager;
  htmlContainer: HTMLDivElement;
  isDevMode = true;

  constructor(containerElement: HTMLDivElement) {
    this.keyboardInputManager = new KeyboardInputManager();
    this.htmlContainer = containerElement;

    return this;
  }

  async loadRawCode(
    fileName: string,
    fileType: keyof typeof CodeStudioLanguages,
    rawCode: string,
  ) {
    await TreeSitterParser.init({
      locateFile() {
        console.log(TREESITTER_WASM);

        return TREESITTER_WASM;
      },
    });
    const parser = new TreeSitterParser();
    const language = CodeStudioLanguages[fileType];

    console.log(
      "Loading parser for fileType:",
      fileType,
      `(${language.language})`,
    );

    parser.setLanguage(
      await TreeSitterParser.Language.load(
        (await language.parser)?.treesitterLanguage ||
          TREESITTER_PLAINTEXT_WASM,
      ),
    );

    return this.renderParsedString(parser.parse(rawCode), language);
  }

  async renderParsedString(
    parser: TreeSitterParser.Tree,
    language: { language: string; parser: Promise<CodeStudioLanguage | null> },
  ) {
    if (this.isDevMode) {
      this.htmlContainer.innerHTML =
        "<div>Using Parser: " + language.language + "</div>";
    } else {
      this.htmlContainer.innerHTML = "";
    }

    this.htmlContainer.innerHTML +=
      '<pre><code id="cs-text-output"></code></pre>';

    const codeElement = document.getElementById(
      "cs-text-output",
    ) as HTMLDivElement;
    codeElement.classList.add(styles.editor);

    const rendered_items: TreeSitterParser.SyntaxNode[] = [];

    if (!(await language.parser)) {
      codeElement.innerHTML = `<div><h1>Unable to find parser for language: ${language.language}</h1></div>`

      return parser
    }

    async function renderToken(
      parentElement: HTMLDivElement | HTMLSpanElement,
      syntaxNode: TreeSitterParser.SyntaxNode,
    ) {
      if (rendered_items.indexOf(syntaxNode) !== -1) {
        console.error("CIRCULAR REFERENCE");
      }
      rendered_items.push(syntaxNode);

      if (syntaxNode.childCount > 0) {
        const tokenElement = document.createElement("span");

        parentElement.appendChild(tokenElement);

        for (let i = 0; i < syntaxNode.childCount; i++) {
          renderToken(tokenElement, syntaxNode.child(i)!); // eslint-disable-line @typescript-eslint/no-non-null-assertion
        }

        return;
      }

      const token = new Token(
        syntaxNode.text,
        (await language.parser)!.tokens[syntaxNode.type],
        {
          col: syntaxNode.startPosition.column,
          row: syntaxNode.startPosition.row,
        },
      );

      parentElement.innerHTML += token.render();
    }

    renderToken(codeElement, parser.rootNode);

    // REMEMBER!: only render visible ranges
    // SRC: https://github.com/georgewfraser/vscode-tree-sitter/blob/master/src/colors.ts

    return parser;
  }
}
