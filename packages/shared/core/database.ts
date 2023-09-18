/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

function changeOccurred( db: KeyValueDatabase ) {
  console.debug( "changeOccurred: ", JSON.stringify( db, null, 2 ) );
}

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
    changeOccurred( this );
  }
  
  removeValue( key: string ) {
    delete this.keys[ key ];
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
  
  doesKeyExist( key: string ) {
    return Object.keys( this.keys ).includes( key );
  }
  
  merge( keys: {
    [ key: string ]: any
  } ) {
    this.keys = Object.assign( this.keys, keys );
  }
}
