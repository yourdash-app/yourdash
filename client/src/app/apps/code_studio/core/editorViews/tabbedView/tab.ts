import {
  ChipletIconDictionary
} from '../../../../../../ui/components/icon/iconDictionary';

import MarkdownView from '../markdownView/markdownView';

import TabbedView, {TabTypes} from './tabbedView';
import styles from './tabbedView.module.scss';

export default class Tab {
  private readonly domElement: HTMLDivElement;
  private containerView: TabbedView;
  private childView: MarkdownView;

  constructor(
    containerView: TabbedView,
    displayName: string,
    type: TabTypes
  ) {
    this.containerView = containerView;
    this.domElement = document.createElement('div');
    this.containerView.domElement.appendChild(this.domElement);

    this.domElement.className = styles.tab;

    const icon = document.createElement('img');
    this.domElement.appendChild(icon);

    icon.alt = '';
    icon.className = `${ styles.icon }`;

    switch (type) {
      default:
        icon.src = '/assets/productLogos/yourdash.svg';
        break;
    }

    const label = document.createElement('span');
    this.domElement.appendChild(label);

    label.innerText = displayName;


    const closeButton = document.createElement('div');
    this.domElement.appendChild(closeButton);

    closeButton.className = `${ styles.closeButton }`;
    closeButton.style.webkitMaskImage = `url(${ ChipletIconDictionary['x-16'] })`;

    closeButton.addEventListener('click', () => this.close());

    this.childView = new MarkdownView(this.containerView.domElement);

    return this;
  }

  close() {
    this.domElement.remove();

    this.containerView.tabCloseEvent(this);
  }

  deactivate() {
    this.domElement.classList.remove(styles.open);
  }

  activate() {
    this.domElement.classList.add(styles.open);
    this.containerView.tabActivateEvent(this);
  }
}
