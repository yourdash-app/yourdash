import clippy from "helpers/clippy"
import path from "path-browserify"
import React, { useEffect, useState } from "react"
import { postJson } from "../../../helpers/fetch"
import { Icon, IconButton, RightClickMenu } from "../../../ui"
import FilesLayout from "./FilesLayout"

const FilesApplication: React.FC = () => {
  const [currentPath, setCurrentPath] = useState( "/" )
  const [files, setFiles] = useState<{ name: string, type: "dir" | "file" }[]>( [] )

  useEffect( () => {
    postJson( "/app/files/get", { path: currentPath }, resp => {
      if ( Object.keys( resp.files ).length === 0 ) {
        return setFiles( [] )
      }

      setFiles( resp?.files || [] )
    } )
  }, [currentPath] )

  return (
    <FilesLayout>
      <section className={ "p-2 flex flex-col bg-container-bg top-0 sticky pb-0 gap-1 shadow-lg" }>
        <div className={ "flex items-center gap-2" }>
          <IconButton
            onClick={ () => {
              setCurrentPath( path.join( currentPath, ".." ) )
            } }
            icon={ "chevron-left-16" }
          />
          <span>{ currentPath }</span>
        </div>
        <div
          className={
            clippy(
              "bg-container-bg pl-2 pr-2 pt-0.5 pb-0.5 text-left transition-colors [transition:var(--transition)] hover:[transition:var(--transition-fast)] flex items-center"
            )
          }
        >
          <Icon name={ "info-16" } className={ "h-[calc(100%-0.35rem)] mr-1.5" } color={ "rgb(var(--container-fg))" }/>
          <span className={ "mr-auto" }>Name</span>
          <span>Type</span>
        </div>
      </section>
      {
        files.map( ( file, ind ) => {
          return (
            <RightClickMenu
              key={ file.name }
              items={ [
                {
                  name: "Delete",
                  onClick() {
                    return 0
                  }
                },
                {
                  name: "Pin to sidebar",
                  onClick() {
                    return 0
                  }
                }
              ] }
              className={ "w-full flex" }
            >
              <button
                type={ "button" }
                onClick={ () => {
                  setCurrentPath( path.join( currentPath, file.name ) )
                } }
                className={
                  clippy(
                    ind % 2 === 0
                      ? "bg-slate-700 bg-opacity-60 hover:bg-opacity-90 active:bg-opacity-75"
                      : "bg-slate-600 bg-opacity-60 hover:bg-opacity-90 active:bg-opacity-75",
                    "pl-2 pr-2 pt-0.5 pb-0.5 text-left transition-colors [transition:var(--transition)] hover:[transition:var(--transition-fast)] flex items-center w-full"
                  )
                }
              >
                <Icon
                  name={ file.type === "file" ? "file-16" : "file-directory-16" }
                  className={ "h-[calc(100%-0.35rem)] mr-1.5" }
                  color={ "rgb(var(--container-fg))" }
                />
                <span className={ "mr-auto" }>{ file.name }</span>
                <span>{ file.type }</span>
              </button>
            </RightClickMenu>
          )
        } )
      }
    </FilesLayout>
  )
}

export default FilesApplication
