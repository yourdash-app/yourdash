import UIComponent from '../uiComponent';
import CoreUI from '../../coreUI';

export default class TabbedView extends UIComponent {
  constructor(parentComponent: UIComponent | CoreUI) {
    super(parentComponent);

    return this;
  }

  initialRender() {
    super.initialRender();

    this.domElement.innerText = 'This is a test for the tabbedView Component';

    return this;
  }
}
