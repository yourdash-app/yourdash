import CoreUI from '../coreUI';

export default class UIComponent {
  domElement: HTMLDivElement;
  parentComponent: UIComponent | CoreUI;
  children: UIComponent[];

  constructor(parentComponent: UIComponent | CoreUI) {
    this.parentComponent = parentComponent;
    this.children = [];
    this.domElement = document.createElement('div');

    this.initialRender();
  }

  initialRender() {
    while (this.children.length > 0) {
      this.parentComponent.domElement.removeChild(this.children[0].domElement);
    }

    this.parentComponent.domElement.appendChild(this.domElement);
    this.children.forEach(child => child.initialRender());
  }
}
