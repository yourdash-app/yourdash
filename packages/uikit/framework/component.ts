/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

/**
 # Notes

 component types
 - RAW ( inherited by all components )
 - AcceleratedGPU
 - HTML

 When a class is created, the __internals__ object is passed as a prop which is omitted from the props in ts definitions
 */

import { UUID } from "@yourdash/shared/core/uuid";
import generateUUID from "@yourdash/shared/web/helpers/uuid";
import UIKitFramework, { UIKitFrameworkType } from "./index";
import UIKitDataStore from "./store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UIKitRawComponentGenericPropsType = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UIKitRawComponentGenericPropsDefaultValue = Record<string, any>;

export interface UIKitRawComponentInternals {
  ukContext: UIKitFramework;
  debug: {
    uuid: UUID;
  };
  type: UIKitFrameworkType;
  htmlElement: HTMLElement;
}

export interface UIKitRawComponentInternals {
  ukContext: UIKitFramework;
  debug: {
    uuid: UUID;
  };
  type: UIKitFrameworkType;
  htmlElement: HTMLElement;
}

export class UIKitRawComponent<
  TProps extends UIKitRawComponentGenericPropsType = UIKitRawComponentGenericPropsDefaultValue,
  TInternals extends UIKitRawComponentInternals = UIKitRawComponentInternals,
> {
  props: UIKitDataStore<TProps>;
  __internal__: TInternals;

  constructor(props: TProps, frameworkType: UIKitFrameworkType = UIKitFrameworkType.HTML) {
    // @ts-ignore
    this.__internal__ = {};
    this.__internal__.type = frameworkType;
    this.props = new UIKitDataStore<TProps>(props);
    this.__internal__.htmlElement = document.createElement("div");

    return this;
  }

  init() {
    if (!this.__internal__) {
      throw new Error("Was the component initialized with a creator? UIKit is missing the __internal__ prop.");
    }

    if (this.__internal__.debug) {
      console.debug("Component initialized", this.__internal__.debug.uuid);

      this.__internal__.debug = {
        uuid: generateUUID(),
      };
    }

    return this;
  }

  define(callback: (component: typeof this) => void): this {
    callback(this);

    return this;
  }
}
