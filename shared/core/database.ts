export default class KeyValueDatabase {
  keys: {
    [ key: string ]: any
  };
  
  constructor() {
    this.keys = {};
  }
  
  get(key: string) {
    return this.keys[ key ];
  }
  
  set(key: string, value: any) {
    this.keys[ key ] = value;
  }
  
  removeValue(key: string) {
    delete this.keys[ key ];
  }
  
  clear() {
    this.keys = {};
  }
  
  getKeys() {
    return Object.keys(this.keys);
  }
  
  getLength() {
    return Object.keys(this.keys).length;
  }
  
  doesKeyExist(key: string) {
    return Object.keys(this.keys).includes(key);
  }
}
