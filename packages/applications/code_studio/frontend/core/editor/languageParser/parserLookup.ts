/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default function getParserForFileExtension( fileExtension: string ): string {
  const extensionForLanguageParser: {
    [ key: string ]: string
  } = {
    js: "javascript",
    json: "json",
    txt: "plainText",
    typescript: "typescript"
  };
  
  return extensionForLanguageParser[fileExtension];
}

export function getParserForLanguage( language: string ): string {
  const extensionForLanguageParser: {
    [ key: string ]: string
  } = {
    javascript: "./lang/javascript/index.ts",
    json: "./lang/json/index.ts",
    plainText: "./lang/plainText/index.ts",
    typescript: "./lang/typescript/index.ts"
  };
  
  return extensionForLanguageParser[language];
}
