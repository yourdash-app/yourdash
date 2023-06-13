import CodeStudioPanel from './panel/panel';
import TabbedView, {TabTypes} from './editorViews/tabbedView/tabbedView';

export default class CodeStudio {
  panels: {
    left: CodeStudioPanel[], right: CodeStudioPanel[],
  } = {
      left: [], right: []
    };

  containerDomElement: HTMLDivElement;
  domElement: HTMLDivElement;

  constructor(containerDomElement: HTMLDivElement) {
    this.containerDomElement = containerDomElement;
    this.domElement = document.createElement('div');

    this.containerDomElement.appendChild(this.domElement);

    while (this.containerDomElement.firstChild) {
      this.containerDomElement.removeChild(this.containerDomElement.firstChild);
    }

    const tabbedView = new TabbedView(this.containerDomElement);

    tabbedView.createTab(TabTypes.PlainText, 'Test Plain Text 1.txt');
    tabbedView.createTab(TabTypes.PlainText, 'Test Plain Text 2.txt');
    tabbedView.createTab(TabTypes.PlainText, 'Test Plain Text 3.txt');
    tabbedView.createTab(TabTypes.PlainText, 'Test Plain Text 4.txt');

    return this;
  }
}
