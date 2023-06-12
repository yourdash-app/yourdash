import CodeStudio from '..';

export default class CodeStudioPanel {
  codeStudioInstance: CodeStudio;
  title: string;
  domElement: HTMLDivElement;

  constructor(codeStudioInstance: CodeStudio, options?: { title?: string }) {
    this.codeStudioInstance = codeStudioInstance;
    this.title = options?.title || 'Unknown Panel';
    this.domElement = document.createElement('div');
    this.codeStudioInstance.containerDomElement.appendChild(this.domElement);

    return this;
  }

  _render() {
    this.domElement.innerHTML = `${this.title}: No Content`;

    return this;
  }
}
