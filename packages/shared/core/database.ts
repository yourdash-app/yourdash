/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class KeyValueDatabase {
  keys: {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };

  constructor() {
    this.keys = {};
  }

  get(key: string) {
    const resp = this.keys[key];

    if (!resp) console.warn(`Key "${key}" not found in database`);

    return resp;
  }

  set(key: string, value: any) {
    // eslint-disable-line @typescript-eslint/no-explicit-any
    this.keys[key] = value;
  }

  removeValue(key: string) {
    delete this.keys[key];
  }

  clear() {
    this.keys = {};
    return this;
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
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }) {
    this.keys = Object.assign(this.keys, keys);
  }
}
