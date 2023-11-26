/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class KeyValueDatabase {
  keys: {
    [ key: string ]: any
  };

  constructor() {
    this.keys = {};
  }

  get( key: string ) {
    return this.keys[ key ];
  }

  set( key: string, value: any ) {
    this.keys[ key ] = value;
  }

  removeValue( key: string ) {
    delete this.keys[ key ];
  }

  clear() {
    this.keys = {};
    return this
  }

  getKeys() {
    return Object.keys( this.keys );
  }

  getLength() {
    return Object.keys( this.keys ).length;
  }

  doesKeyExist( key: string ) {
    return Object.keys( this.keys ).includes( key );
  }

  merge( keys: {
    [ key: string ]: any
  } ) {
    this.keys = Object.assign( this.keys, keys );
  }
}
