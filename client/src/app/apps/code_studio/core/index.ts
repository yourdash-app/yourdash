import CodeStudioPanel from './panel/panel';
import UIComponent from './components/uiComponent';
import CoreUI from './coreUI';
import TabbedView from './components/tabbedView/tabbedView';

export default class CodeStudio extends CoreUI {
  panels: {
    left: CodeStudioPanel[], right: CodeStudioPanel[],
  } = {
      left: [], right: []
    };

  constructor(containerDomElement: HTMLDivElement) {
    super(containerDomElement);

    const component = new TabbedView(this);

    // const tabbedView = new TabbedView(this.containerDomElement);
    //
    // tabbedView.createTab(TabTypes.PlainText, 'Test Plain Text 1.txt');
    // tabbedView.createTab(TabTypes.PlainText, 'Test Plain Text 2.txt');
    // tabbedView.createTab(TabTypes.PlainText, 'Test Plain Text 3.txt');
    // tabbedView.createTab(TabTypes.PlainText, 'Test Plain Text 4.txt');

    return this;
  }
}
