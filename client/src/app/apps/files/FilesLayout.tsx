import path from "path-browserify"
import React, { useState } from "react"
import { Button } from "../../../ui"

export interface IFilesLayout {
  children: React.ReactNode;
}

const FilesLayout: React.FC<IFilesLayout> = ( { children } ) => {
  const [
    sidebarShortcuts,
    setSidebarShortcuts
  ] = useState<{path: string, type: "directory" | "file"}[] | null>( null )

  return (
    <main className={ "grid grid-cols-[auto,1fr] h-full" }>
      <section
        className={ "flex flex-col min-h-full overflow-x-hidden overflow-y-auto pl-1 " +
                  "pr-1 border-r-2 border border-container-border min-w-[10rem]" }
      >
        <h1
          className={ "font-semibold text-container-fg text-3xl text-center pt-2 pb-2" }
        >
          Files
        </h1>

        <div className={ "flex flex-col gap-1" }>
          <h2 className={ "pl-2 pr-2 pb-0.5 pt-2" }>Shortcuts</h2>
          {
            sidebarShortcuts
              ? sidebarShortcuts.map( shortcut => (
                <Button key={ shortcut.path } className={ "!pt-0.5 !pb-0.5" }>
                  <span className={ "m-0" }>{path.basename( shortcut.path )}</span>
                </Button>
              ) )
              : (
                <Button>
                  Add Home shortcut?
                </Button>
              )
          }
        </div>
      </section>
      <section className={ "flex flex-col w-full min-h-full overflow-auto" }>
        { children }
      </section>
    </main>
  )
}

export default FilesLayout
