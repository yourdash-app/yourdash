/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export type TsScopeTypes = "function" | "boolean" | "object" | "string" | "number" | "class" | "globalScope"

export default class TsScope<T extends TsScopeTypes> {
  name = "anonymous";
  type: this = this;
  readonly isFunction: boolean = false;
  localScopes: { [name: string]: TsScope<any> } = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
  accessOutsideOfCurrentScope = true;
  
  constructor( { name, isFunction, accessOutsideOfCurrentScope }: { name?: string, isFunction?: boolean, accessOutsideOfCurrentScope?: boolean } ) {
    if ( name )
      this.name = name;
    if ( isFunction )
      this.isFunction = isFunction;
    if ( accessOutsideOfCurrentScope )
      this.accessOutsideOfCurrentScope = accessOutsideOfCurrentScope;
  }
  
  addChild<C extends TsScopeTypes>( child: TsScope<C> ) {
    this.localScopes[child.name] = child;
  }
}
