/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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

function changeOccurred( db: KeyValueDatabase ) {
  console.debug( "changeOccurred: ", JSON.stringify( db, null, 2 ) );
}
