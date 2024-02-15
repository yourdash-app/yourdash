/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import {
  UIKitRawComponent,
  UIKitRawComponentGenericPropsDefaultValue,
  UIKitRawComponentGenericPropsType,
} from "../component";
import { UIKitFrameworkType } from "../index";

export default class UIKitHTMLComponent<
  PropType extends UIKitRawComponentGenericPropsType = UIKitRawComponentGenericPropsDefaultValue,
> extends UIKitRawComponent<PropType> {
  constructor(props: PropType) {
    super(props, UIKitFrameworkType.HTML);
    return this;
  }

  init() {
    return this;
  }
}
