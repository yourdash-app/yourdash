export default class PlainView {
  // eslint-disable-next-line no-use-before-define
  parentView: PlainView;

  constructor(parentView: PlainView) {
    this.parentView = parentView;
  }

  render() {
    return this;
  }
}
