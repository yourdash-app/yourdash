import styles from './tabbedView.module.scss';
import Tab from './tab';

// eslint-disable-next-line no-shadow
export enum TabTypes {
    PlainText,
    HEX,
    Image,
    SVG
}

export default class TabbedView {
  domElement: HTMLDivElement;
  tabs: Tab[] = [];

  constructor(container: HTMLDivElement) {
    this.domElement = document.createElement('div');
    container.appendChild(this.domElement);

    this.domElement.className = `${styles.tabbedView}`;

    return this;
  }

  createTab(type: TabTypes, displayName: string) {
    this.tabs.push(new Tab(this, displayName, type));
  }

  tabCloseEvent(tab: Tab) {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  tabOpenEvent(tab: Tab) {
    this.tabs.push(tab);
  }
}
