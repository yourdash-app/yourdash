/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export default class KeyValueDatabase {
  keys: {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  };

  constructor() {
    this.keys = {};
  }

  get<ResponseType = unknown>(key: string): ResponseType | undefined {
    const resp = this.keys[key];

    // if (!resp) console.warn(`Key "${key}" not found in database`);

    return resp || undefined;
  }

  set(key: string, value: unknown) {
    this.keys[key] = value;

    return this;
  }

  removeValue(key: string) {
    delete this.keys[key];

    return this;
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
