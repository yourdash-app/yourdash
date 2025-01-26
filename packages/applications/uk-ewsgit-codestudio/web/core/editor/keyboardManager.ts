/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class KeyboardInputManager {
  private static _shortcutKeys: {
    [category: string]: {
      [shortcut: string]: () => void;
    };
  } = {};

  private static _currentKeys: string[] = [];

  public static init(): void {
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  public static addShortcut(category: string, shortcut: string, callback: () => void): void {
    // Normalize the shortcut to be case-insensitive and to trim spaces
    const normalizedShortcut = shortcut.toLowerCase().replace(/\s+/g, "");
    if (!(category in this._shortcutKeys)) {
      this._shortcutKeys[category] = {};
    }
    this._shortcutKeys[category][normalizedShortcut] = callback;
  }

  public static removeShortcut(category: string, shortcut: string): void {
    const normalizedShortcut = shortcut.toLowerCase().replace(/\s+/g, "");
    if (category in this._shortcutKeys && normalizedShortcut in this._shortcutKeys[category]) {
      delete this._shortcutKeys[category][normalizedShortcut];
    }
  }

  private static handleKeyDown(event: KeyboardEvent): void {
    this._currentKeys.push(event.key.toLowerCase());
    const currentKeysString = this._currentKeys.join("+");
    for (const category in this._shortcutKeys) {
      if (currentKeysString in this._shortcutKeys[category]) {
        this._shortcutKeys[category][currentKeysString]();
        this._currentKeys = [];
        break;
      }
    }
  }

  private static handleKeyUp(): void {
    this._currentKeys = [];
  }
}
