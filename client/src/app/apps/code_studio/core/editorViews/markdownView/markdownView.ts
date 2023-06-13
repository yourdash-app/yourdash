import styles from './markdownView.module.scss';

export default class MarkdownView {
  domElement: HTMLDivElement;

  constructor(container: HTMLDivElement) {
    this.domElement = document.createElement('div');
    container.appendChild(this.domElement);

    return this;
  }

  render() {
    this.domElement = document.createElement('div');

    this.domElement.className = `${ styles.markdownView }`;

  }
}
