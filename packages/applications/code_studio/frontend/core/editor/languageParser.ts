export default class CodeStudioLanguageParser<TLanguage extends string> {
  private language: TLanguage;
  private currentTokenIndex = 0;
  private currentParsedToken = "";
  private currentScope = {
    tokens: [],
    startTokenIndex: 0,
    endTokenIndex: 0,
    parentScope: CodeStudioScope,
  }

  constructor(language: TLanguage) {
    this.language = language;

    let devInterval = setInterval(() => {
      this.step()
    })
  }

  getLanguage(): TLanguage {
    return this.language;
  }

  step(): void {
    this.currentTokenIndex++;
  }

  getCurrentTokenIndex(): number {
    return this.currentTokenIndex;
  }

  getCurrentParsedToken(): string {

  }
}
