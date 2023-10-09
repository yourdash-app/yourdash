/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

function changeOccurred( db ) {
  console.debug( "changeOccurred: ", JSON.stringify( db, null, 2 ) );
}
export default class KeyValueDatabase {
  keys;
  constructor() {
    this.keys = {};
  }
  get( key ) {
    return this.keys[key];
  }
  set( key, value ) {
    this.keys[key] = value;
    changeOccurred( this );
  }
  removeValue( key ) {
    delete this.keys[key];
    changeOccurred( this );
  }
  clear() {
    this.keys = {};
    changeOccurred( this );
  }
  getKeys() {
    return Object.keys( this.keys );
  }
  getLength() {
    return Object.keys( this.keys ).length;
  }
  doesKeyExist( key ) {
    return Object.keys( this.keys ).includes( key );
  }
  merge( keys ) {
    this.keys = Object.assign( this.keys, keys );
  }
}
// # sourceMappingURL=database.js.map
