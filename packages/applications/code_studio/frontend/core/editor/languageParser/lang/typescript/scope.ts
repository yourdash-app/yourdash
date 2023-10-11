/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class TsScope<T extends TsScope<T>> {
  name = "anonymous";
  type: this;
  readonly isFunction: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localScopes: { [name: string]: TsScope<any> };
  accessOutsideOfCurrentScope = true;
  
  constructor( { name, isFunction, accessOutsideOfCurrentScope }: { name?: string, isFunction?: boolean, accessOutsideOfCurrentScope?: boolean } ) {
    this.type = this;
    this.localScopes = {}
    if ( name )
      this.name = name;
    if ( isFunction )
      this.isFunction = isFunction;
    if ( accessOutsideOfCurrentScope )
      this.accessOutsideOfCurrentScope = accessOutsideOfCurrentScope;
  }
  
  addChild( child: TsScope<T> ) {
    this.localScopes[child.name] = child;
  }
}
