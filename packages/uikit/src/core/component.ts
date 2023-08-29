import State from "./state.ts";

export type UKComponentProps = { [name: string]: any }
export type UKComponentState = { [name: string]: State<any> }
export type UKComponentSlots = { [name: string]: State<UKComponent<UKComponentProps, UKComponentState, UKComponentSlots>> }

export default class UKComponent<
    ComponentProps extends UKComponentProps,
    ComponentState extends UKComponentState,
    ComponentSlots extends UKComponentSlots
> {
  declare domElement: HTMLElement;
  declare parentDomElement: HTMLElement;
  state: ComponentState
  slots: ComponentSlots
  props: ComponentProps

  constructor(props: ComponentProps) {
    this.props = props
    this.state = {} as ComponentState
    this.slots = {} as ComponentSlots

    return this
  }
}