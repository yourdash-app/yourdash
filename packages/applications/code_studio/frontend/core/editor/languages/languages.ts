/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import CodeStudioLanguage from "./language";
import registerLanguage from "./registerLanguage";

interface ICodeStudioLanguages {
  [key: string]: {
    language: string;
    parser: Promise<CodeStudioLanguage | null>;
  };
}

const CodeStudioLanguages: ICodeStudioLanguages = {
  txt: { language: "plaintext", parser: registerLanguage("plaintext") },
  js: { language: "javascript", parser: registerLanguage("javascript") },
};

export default CodeStudioLanguages;
