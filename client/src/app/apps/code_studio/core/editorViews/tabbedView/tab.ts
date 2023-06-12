import {
  ChipletIconDictionary
} from '../../../../../../ui/components/icon/iconDictionary';

import TabbedView, {TabTypes} from './tabbedView';
import styles from './tabbedView.module.scss';

export default class Tab {
  private readonly domElement: HTMLDivElement;
  private containerView: TabbedView;

  constructor(
    containerView: TabbedView,
    displayName: string,
    type: TabTypes
  ) {
    this.containerView = containerView;
    this.domElement = document.createElement('div');
    this.containerView.domElement.appendChild(this.domElement);

    this.domElement.className = `${styles.tab}`;

    const icon = document.createElement('img');
    this.domElement.appendChild(icon);

    icon.alt = '';
    icon.className = `${styles.icon}`;

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

    closeButton.className = `${styles.closeButton}`;
    closeButton.style.webkitMaskImage = `url(${ChipletIconDictionary['x-16']})`;

    closeButton.addEventListener('click', () => this.close());

    return this;
  }

  close() {
    this.domElement.remove();

    this.containerView.tabCloseEvent(this);
  }

  open() {
    this.containerView.tabOpenEvent(this);
  }
}
