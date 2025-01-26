/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
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
  ts: { language: "typescript", parser: registerLanguage("typescript") },
  md: { language: "markdown", parser: registerLanguage("markdown") },
};

export default CodeStudioLanguages;
