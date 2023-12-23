/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class State<T> {
  __internal__value: T;
  __internal__hooks: ( ( value: T ) => void )[]

  constructor( initialValue?: T ) {
    this.__internal__value = initialValue || null as T
    this.__internal__hooks = []

    return this
  }

  set( value: T ): void {
    this.__internal__value = value
    this.__internal__hooks.forEach( hook => {
      hook( this.__internal__value )
    } )
  }

  get(): T {
    return this.__internal__value
  }

  onChange( callback: ( value: T ) => void ): void {
    this.__internal__hooks.push( callback )
  }
}
