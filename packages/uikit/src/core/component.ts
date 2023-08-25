import State from "./state.ts";

export interface UKComponentProps {
    [name: string]: unknown
}

export default class UKComponent  {
  dom: { [name: string]: { element: HTMLElement, children: UKComponent["dom"] } } = {};
  declare domElement: HTMLElement;
  declare parentDomElement: HTMLElement;
  state: { [name: string]: State<unknown> } = {}
  props: UKComponentProps
  
  constructor( props: UKComponentProps ) {
    this.props = props
    
    return this
  }
}