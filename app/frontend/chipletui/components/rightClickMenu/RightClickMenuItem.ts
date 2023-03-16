export default interface RightClickMenuItem {
  name: string,
  onClick: () => void,
  shortcut?: string
}