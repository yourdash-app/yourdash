/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

/**
 * # UIKitDataStore
 *
 * UIKitDataStore is UIKit's take on a state management system.
 *  */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class UIKitDataStore<TValues> {
  private readonly defaultValues: TValues;
  private values: TValues;
  private readonly valuesEvents: {
    [Val in keyof TValues]?: ((previousValue: TValues[Val], newValue: TValues[Val]) => void)[];
  };

  constructor(defaultValues: TValues) {
    this.defaultValues = defaultValues;
    this.values = defaultValues;
    this.valuesEvents = {};

    return this;
  }

  set<K extends keyof TValues>(key: K, value: TValues[K]) {
    const previousValue = this.values[key];
    this.values[key] = value;

    this.valuesEvents[key]?.forEach((event) => event(previousValue, value));

    return this;
  }

  get<K extends keyof TValues>(key: K): TValues[K] {
    return this.values[key];
  }

  on<K extends keyof TValues>(key: K, callback: (previousValue: TValues[K], newValue: TValues[K]) => void) {
    if (this.valuesEvents[key]) {
      this.valuesEvents[key]?.push(callback);
    } else {
      this.valuesEvents[key] = [callback];
    }

    return this;
  }

  off<K extends keyof TValues>(key: K, callback: (previousValue: TValues[K], newValue: TValues[K]) => void) {
    if (this.valuesEvents[key]) {
      const index = this.valuesEvents[key]?.indexOf(callback);
      if (index !== -1 && index !== undefined) {
        this.valuesEvents[key]?.splice(index, 1);
      } else {
        throw new Error("cannot remove listener that was never added!");
      }
    }
  }

  reset() {
    this.values = this.defaultValues;
    return this;
  }

  resetKey<K extends keyof TValues>(key: K) {
    this.values[key] = this.defaultValues[key];
    return this;
  }
}
