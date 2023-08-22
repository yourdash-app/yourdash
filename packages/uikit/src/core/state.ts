export default class State<T> {
  private value: T;
  private hooks: ( ( value: T ) => void )[]

  constructor( initialValue: T ) {
    this.value = initialValue
    this.hooks = []

    return this
  }

  set( value: T ): void {
    this.value = value

    this.hooks.forEach( hook => {
      hook( this.value )
    } )
  }

  get(): T {
    return this.value
  }
}