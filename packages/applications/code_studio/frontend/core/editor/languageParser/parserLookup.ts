export default function getParserForFileExtension( fileExtension: string ): string {
  const extensionForLanguageParser: {
    [ key: string ]: string
  } = {
    js: "javascript",
    json: "json",
    txt: "plainText"
  };
  
  return extensionForLanguageParser[fileExtension];
}

export function getParserForLanguage( language: string ): string {
  const extensionForLanguageParser: {
    [ key: string ]: string
  } = {
    javascript: "./lang/javascript.ts",
    json: "./lang/json.ts",
    plainText: "./lang/plainText.ts"
  };
  
  return extensionForLanguageParser[language];
}
