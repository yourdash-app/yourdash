/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StoreType = { [key: string]: any };
type listeners<ST extends StoreType> = { [Key in keyof ST]?: ((previousValue: ST[Key], newValue: ST[Key]) => void)[] };

export default class dataStore<ST extends StoreType> {
  private data: ST;
  private readonly defaultValue: ST;
  private readonly listeners: listeners<ST>;

  constructor(defaultValue: ST) {
    this.defaultValue = defaultValue;
    this.data = defaultValue;
    this.listeners = {};

    return this;
  }

  public set<Key extends keyof ST>(key: Key, value: ST[Key]) {
    const previousValue = this.data[key];

    this.data[key] = value;

    this.listeners[key]?.forEach((listener) => listener(previousValue, value));

    return this;
  }

  public get<Key extends keyof ST>(key: Key): ST[Key] {
    return this.data[key];
  }

  public remove<Key extends keyof ST>(key: Key) {
    delete this.data[key];

    return this;
  }

  public reset() {
    this.data = this.defaultValue;

    return this;
  }

  on(key: keyof ST, listener: (previousValue: ST[keyof ST], newValue: ST[keyof ST]) => void) {
    if (!this.listeners[key]) {
      this.listeners[key] = [];
    }

    this.listeners[key]?.push(listener);

    return this;
  }

  off(key: keyof ST, listener: (previousValue: ST[keyof ST], newValue: ST[keyof ST]) => void) {
    this.listeners[key] = this.listeners[key]?.filter((l) => l !== listener);

    return this;
  }

  once(key: keyof ST, listener: (previousValue: ST[keyof ST], newValue: ST[keyof ST]) => void) {
    const wrappedListener = (previousValue: ST[keyof ST], newValue: ST[keyof ST]) => {
      listener(previousValue, newValue);
      this.off(key, wrappedListener);
    };

    return this.on(key, wrappedListener);
  }
}
