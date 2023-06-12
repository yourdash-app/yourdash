import CodeStudioEditorTab from "./tab"
import CodeStudioEditor from "./editor"

export default class CodeStudioCoreUI {
  containerElement: HTMLDivElement
  showTabBar: boolean
  tabBarElement: HTMLDivElement
  editorElement: HTMLDivElement
  openTabs: CodeStudioEditorTab[]
  editorInstance: CodeStudioEditor

  constructor( containerElement: HTMLDivElement ) {
    // remove all children from containerElement
    while ( containerElement.firstChild ) {
      containerElement.removeChild( containerElement.firstChild )
    }

    this.containerElement = containerElement
    this.showTabBar = true
    this.openTabs = []

    this.tabBarElement = document.createElement( "div" )
    this.containerElement.appendChild( this.tabBarElement )
    this.editorElement = document.createElement( "div" )
    this.containerElement.appendChild( this.editorElement )

    this.containerElement.classList.add(
      "flex",
      "flex-col",
      "min-h-full",
      "h-full",
      "w-full",
      "overflow-hidden",
      "bg-red-400"
    )

    this.editorInstance = new CodeStudioEditor( this )

    const testTabs = [
      new CodeStudioEditorTab( this ),
      new CodeStudioEditorTab( this ),
      new CodeStudioEditorTab( this )
    ]

    this.openTabs.push( testTabs[0] )
    this.openTabs.push( testTabs[1] )
    this.openTabs.push( testTabs[2] )

    this.renderTabs()

    testTabs[0].activate()

    return this
  }

  renderTabs() {
    this.tabBarElement.classList.add(
      "flex",
      "flex-row",
      "items-center",
      "h-10",
      "w-full",
      "bg-slate-800",
      "border-b-[1px]",
      "border-b-slate-700"
    )

    this.openTabs.forEach( tab => {
      return tab.render( this.tabBarElement )
    } )

    return this
  }
}
