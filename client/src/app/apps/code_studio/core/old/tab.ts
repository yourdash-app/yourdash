import CodeStudioCoreUI from "./main"

export default class CodeStudioEditorTab {
  displayName = "Unknown Tab"
  domElement: HTMLDivElement
  path: string | undefined
  active: boolean
  parentEditor: CodeStudioCoreUI
  indicatorElement: HTMLDivElement

  constructor( editor: CodeStudioCoreUI, path: string | undefined = undefined ) {
    this.domElement = document.createElement( "div" )
    this.path = path
    this.active = false
    this.parentEditor = editor
    this.indicatorElement = document.createElement( "div" )

    return this
  }

  close() {
    if ( this.active ) {
      this.active = false

      while ( this.parentEditor.editorElement.firstChild ) {
        this.parentEditor.editorElement.removeChild( this.parentEditor.editorElement.firstChild )
      }
    }

    this.domElement.remove()

    this.parentEditor.openTabs = this.parentEditor.openTabs.filter( tab => {
      return tab !== this
    } )
  }

  activate(): this {
    while ( this.parentEditor.editorElement.firstChild ) {
      this.parentEditor.editorElement.removeChild( this.parentEditor.editorElement.firstChild )
    }

    this.parentEditor.openTabs.forEach( tab => {
      tab.deactivate()
    } )

    this.active = true

    if ( this.path ) {
      this.parentEditor.editorInstance.contents = this.path
      this.parentEditor.editorInstance.render()

      this.indicatorElement.classList.remove( "hidden" )
      this.indicatorElement.classList.add( "block" )

      return this
    }

    this.parentEditor.editorInstance.render()

    this.indicatorElement.classList.remove( "hidden" )
    this.indicatorElement.classList.add( "block" )

    return this
  }

  deactivate() {
    this.active = false

    this.indicatorElement.classList.remove( "block" )
    this.indicatorElement.classList.add( "hidden" )
  }

  render( container: HTMLDivElement ) {
    container.appendChild( this.domElement )
    this.domElement.appendChild( document.createElement( "div" ) )

    this.domElement.children[0].textContent = this.displayName
    this.domElement.children[0].classList.add(
      "flex",
      "gap-2"
    )

    this.domElement.classList.add(
      "pl-1.5",
      "pr-1.5",
      "h-full",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "hover:bg-blue-500",
      "active:bg-blue-600",
      "group",
      "gap-1"
    )

    this.domElement.addEventListener( "click", e => {
      e.stopPropagation()
      e.preventDefault()

      this.activate()
    } )

    const closeButton = document.createElement( "button" )
    closeButton.classList.add(
      "aspect-square",
      "rounded-full",
      "bg-red-400",
      "h-4",
      "hidden",
      "group-hover:block",
      "m-auto"
    )

    closeButton.addEventListener( "click", e => {
      e.stopPropagation()
      e.preventDefault()

      this.close()
    } )

    this.indicatorElement.classList.add(
      "w-full",
      "h-0.5",
      "rounded-full",
      "bg-purple-500",
      "hidden"
    )
    this.domElement.appendChild( this.indicatorElement )

    this.domElement.children[0].appendChild( closeButton )

    return this
  }
}
