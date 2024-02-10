/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

/**
 # Notes

 component types
 RAW ( inherited by all components )
 - AcceleratedGPU
 - HTML

 When a class is created, the __internals__ object is passed as a prop which is omitted from the props in ts definitions
 */

import { UUID } from "@yourdash/shared/core/uuid";
import UIKitFramework, { UIKitFrameworkType } from "./index";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class UIKitRawComponent<TProps = Record<string, any>> {
  readonly props: Readonly<TProps>;
  __internal__: {
    ukContext: UIKitFramework;
    debug: {
      uuid: UUID;
    };
    type: UIKitFrameworkType;
  };

  constructor(props: TProps, frameworkType: UIKitFrameworkType = UIKitFrameworkType.HTML) {
    const internalProps = props as { __internal__: UIKitRawComponent<TProps>["__internal__"] } & TProps;

    if (!internalProps.__internal__) {
      throw new Error("Was the component initialized with a creator? UIKit is missing the __internal__ prop.");
    }

    this.__internal__ = internalProps.__internal__;
    this.__internal__.type = frameworkType;
    this.props = props;

    return this;
  }

  // load the desired component over this RAW component ( helps with reduction of prop spam )
  __internal__overload(component: UIKitRawComponent<TProps>) {
    if (this.__internal__.ukContext.frameworkType !== component.__internal__.type) {
    }
  }

  // called on component creation by its creator
  onCreate() {
    return this;
  }

  define(callback: (component: typeof this) => void): this {
    callback(this);

    return this;
  }
}
