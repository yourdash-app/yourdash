export default class State<T> {
  private value: T;
  private hooks: ((value: T) => void)[]

  constructor(initialValue?: T) {
    if (initialValue) {
      this.value = initialValue
    } else {
      this.value = null as T
    }

    this.hooks = []

    return this
  }

  set(value: T): void {
    this.value = value

    this.hooks.forEach(hook => {
      hook(this.value)
    })
  }

  get(): T {
    return this.value
  }

  addListener(callback: (value: T) => void): void {
    this.hooks.push(callback)
  }
}