import KeyboardInputManager from "./keyboardManager";

export default class CodeStudioEditor {
  keyboardInputManager: KeyboardInputManager;
  htmlContainer: HTMLDivElement;

  constructor(containerElement: HTMLDivElement) {
    this.keyboardInputManager = new KeyboardInputManager();
    this.htmlContainer = containerElement;

    return this;
  }
}
