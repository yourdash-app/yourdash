/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ContentRoot from "./contentRoot";

export default class UIKit {
  contentRoot: ContentRoot;

  constructor() {
    this.contentRoot = new ContentRoot();
  }
}
