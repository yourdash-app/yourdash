/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import KeyboardInputManager from "./keyboardManager";
import TreeSitterParser from "web-tree-sitter";
import styles from "./editor.module.scss";
import CodeStudioLanguages from "./languages/languages";
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

    return this.renderParsedString(parser.parse(rawCode));
  }

  renderParsedString(parser: TreeSitterParser.Tree) {
    if (this.isDevMode) {
      this.htmlContainer.innerHTML = "<div>Using Parser: " + parser + "</div>";
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

    function renderToken(
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

      const tokenElement = document.createElement("span");

      tokenElement.innerText = syntaxNode.text;

      switch (syntaxNode.type) {
        case "type_identifier":
        case "type_parameter":
        case "type_parameters":
          tokenElement.classList.add(styles.type_identifier);
          break;
        case "comment":
          tokenElement.classList.add(styles.comment);
          break;
        case "string":
        case "string_fragment":
          tokenElement.classList.add(styles.string);
          break;
        case "number":
          tokenElement.classList.add(styles.number);
          break;
        case "property_identifier":
          tokenElement.classList.add(styles.propertyIdentifier);
          break;
        case "identifier":
          tokenElement.classList.add(styles.identifier);
          break;
        case "operator":
        case "+":
        case "-":
        case "=":
        case "_":
        case ">":
        case "<":
        case "<<":
        case ">>":
        case "--":
        case "++":
        case "&":
        case "&&":
        case "*":
        case "^":
        case "%":
        case "$":
        case "!":
        case "!!":
        case "|":
        case "||":
        case "`":
        case "!=":
        case "!==":
        case "==":
        case "===":
        case "=>":
        case ">=":
        case "<=":
        case "?":
        case "...":
          tokenElement.classList.add(styles.operator);
          break;
        case '"':
        case ".":
        case ",":
        case "'":
        case ";":
        case ":":
        case "}":
        case "{":
        case "[":
        case "]":
        case "(":
        case ")":
        case "${":
        case "\\":
        case "/":
          tokenElement.classList.add(styles.punctuation);
          break;
        case "regex_pattern":
        case "regex_flags":
        case "extends":
        case "async":
        case "abstract":
        case "do":
        case "keyword":
        case "module":
        case "export":
        case "function":
        case "var":
        case "let":
        case "const":
        case "class":
        case "interface":
        case "type":
        case "if":
        case "else":
        case "for":
        case "while":
        case "switch":
        case "case":
        case "default":
        case "try":
        case "catch":
        case "finally":
        case "return":
        case "break":
        case "continue":
        case "new":
        case "delete":
        case "typeof":
        case "instanceof":
        case "void":
        case "null":
        case "true":
        case "false":
        case "this":
        case "undefined":
        case "in":
        case "yield":
        case "await":
        case "from":
        case "import":
        case "import_statement":
        case "export_statement":
          tokenElement.classList.add(styles.keyword);
          break;
        default:
          console.log(syntaxNode.type);
          const afterElement = document.createElement("span");
          tokenElement.appendChild(afterElement);
          afterElement.classList.add(styles.symbol);
          afterElement.classList.add(styles.parseFailure);
          afterElement.innerText = syntaxNode.type;
          break;
      }

      tokenElement.classList.add(styles.symbol);

      parentElement.appendChild(tokenElement);
    }

    renderToken(codeElement, parser.rootNode);

    // REMEMBER!: only render visible ranges
    // SRC: https://github.com/georgewfraser/vscode-tree-sitter/blob/master/src/colors.ts

    return parser;
  }
}
