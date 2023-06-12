import CodeStudioCoreUI from "./main"

export default class CodeStudioEditorEditor {
  contents: string
  containerElement: HTMLDivElement
  cursorLocation: [number, number]
  coreUI: CodeStudioCoreUI
  onKey: ( ( keyManager: CodeStudioKeyManager ) => void )[]

  constructor( coreUI: CodeStudioCoreUI ) {
    this.contents = "Empty file, placeholder"
    this.containerElement = coreUI.editorElement
    this.coreUI = coreUI
    this.cursorLocation = [0, 0]

    coreUI.editorElement.addEventListener( "keydown", e => {

    } )

    return this
  }

  render() {
    // @ts-ignore
    this.containerElement.class = ""

    this.containerElement.classList.add( "grid", "grid-cols-[auto,1fr,auto]", "h-full", "w-full", "bg-slate-900" )

    const gutter = document.createElement( "div" )
    const textArea = document.createElement( "div" )

    this.containerElement.appendChild( gutter )
    this.containerElement.appendChild( textArea )

    gutter.classList.add(
      "flex",
      "flex-col",
      "bg-slate-800",
      "pl-2",
      "pr-2",
      "min-w-[4rem]",
      "mr-1",
      "border-r-[1px]",
      "border-r-slate-700"
    )

    this.contents.split( "\n" ).forEach( ( line, ind ) => {
      const lineElement = document.createElement( "div" )
      lineElement.classList.add( "flex", "items-center", "justify-between" )
      lineElement.textContent = line
      textArea.appendChild( lineElement )

      const gutterElement = document.createElement( "div" )
      gutterElement.classList.add( "flex", "items-center", "justify-center" )
      gutterElement.textContent = ( ind + 1 ).toString( 10 )
      gutter.appendChild( gutterElement )
    } )

    return this
  }
}
