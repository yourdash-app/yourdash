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
    javascript: "./lang/javascript",
    json: "./lang/json",
    plainText: "./lang/plainText"
  };
  
  return extensionForLanguageParser[language];
}
