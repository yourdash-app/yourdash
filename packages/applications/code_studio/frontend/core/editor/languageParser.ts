import CodeStudioLanguage from "./languages/language";
import CodeStudioRenderableToken from "./renderableToken";

export interface CodeStudioScope {
  tokens: CodeStudioRenderableToken[];
  startTokenIndex: number;
  endTokenIndex: number;
  // the root scope cannot have a parent scope, so we return null
  parentScope: CodeStudioScope | null;
}

export default class CodeStudioLanguageParser {
  private readonly language: CodeStudioLanguage;
  private currentTokenIndex = 0;
  private currentParsedToken: CodeStudioRenderableToken | null = null;
  private rootScope: CodeStudioScope = {
    tokens: [],
    startTokenIndex: 0,
    endTokenIndex: 0,
    parentScope: null,
  };
  private currentScope: CodeStudioScope = {
    tokens: [],
    startTokenIndex: 0,
    endTokenIndex: 0,
    parentScope: null,
  };

  constructor(language: CodeStudioLanguage) {
    this.language = language;

    const devInterval = setInterval(() => {
      this.step();

      if (this.currentTokenIndex >= this.language.tokens.length) {
        clearInterval(devInterval);
      }
    }, 500);
  }

  getLanguage(): CodeStudioLanguage {
    return this.language;
  }

  step(): void {
    this.currentTokenIndex++;
  }

  getCurrentTokenIndex(): number {
    return this.currentTokenIndex;
  }

  getCurrentParsedToken() {
    return this.currentParsedToken;
  }
}
