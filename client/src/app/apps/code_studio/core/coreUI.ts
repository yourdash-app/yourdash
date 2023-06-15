import UIComponent from './components/uiComponent';
import styles from './coreUI.module.scss';

export default class CoreUI {
  containingDomElement: HTMLDivElement;
  children: UIComponent[];
  domElement: HTMLDivElement;

  constructor(containingDomElement: HTMLDivElement) {
    this.containingDomElement = containingDomElement;
    this.children = [];

    while (this.containingDomElement.children.length > 0) {
      this.containingDomElement.removeChild(this.children[0].domElement);
    }

    this.domElement = document.createElement('div');
    this.containingDomElement.appendChild(this.domElement);

    this.__internalRender();
  }

  __internalRender() {
    this.domElement.className = styles.component;

    while (this.domElement.children.length > 0) {
      this.domElement.removeChild(this.children[0].domElement);
    }

    this.children.forEach(child => child.initialRender());
  }
}
