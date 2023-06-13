import MarkdownView from '../markdownView/markdownView';

import PlainView from '../plainView/plainView';

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
  childView: MarkdownView | undefined;

  constructor(container: HTMLDivElement) {
    this.domElement = document.createElement('div');
    container.appendChild(this.domElement);

    this.domElement.className = `${ styles.tabbedView }`;

    this.childView = undefined;

    console.log(this);

    return this;
  }

  createTab(type: TabTypes, displayName: string) {
    this.tabs.push(new Tab(this, displayName, type));
  }

  tabCloseEvent(tab: Tab) {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  tabActivateEvent(tab: Tab) {
    this.tabs.forEach(t => {
      t.deactivate();
    });

    this.tabs.push(tab);
  }

  renderChildView() {
    this.childView?.render();
  }
}
