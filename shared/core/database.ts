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
    changeOccured(this);
  }
  
  removeValue(key: string) {
    delete this.keys[ key ];
    changeOccured(this);
  }
  
  clear() {
    this.keys = {};
    changeOccured(this);
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
  
  merge(keys: {
    [ key: string ]: any
  }) {
    this.keys = Object.assign(this.keys, keys);
  }
}

function changeOccured(db: KeyValueDatabase) {
  console.log("changeOccured: ", JSON.stringify(db, null, 2));
}
