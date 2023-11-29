/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import TsScope from "./scope";

export default class TsGlobalScope extends TsScope<"globalScope"> {
  constructor() {
    super( { name: "global", isFunction: false, accessOutsideOfCurrentScope: true } );
  
    this.addChild( new TsScope<"string">( { name: "foo", isFunction: false, accessOutsideOfCurrentScope: false } ) )
  }
}
