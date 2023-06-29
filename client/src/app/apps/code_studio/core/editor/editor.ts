import KeyboardInputManager from "./keyboardManager";
import {CodeStudioFileTypes} from "./fileTypes";

export default class CodeStudioEditor {
  keyboardInputManager: KeyboardInputManager;
  htmlContainer: HTMLDivElement;

  constructor(containerElement: HTMLDivElement) {
    this.keyboardInputManager = new KeyboardInputManager();
    this.htmlContainer = containerElement;

    return this;
  }

  // TODO: implement ME
  loadRawCode(fileName: string, fileType: CodeStudioFileTypes, rawCode: string) {
    return;
  }
}
