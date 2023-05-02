import clippy from "helpers/clippy"
import path from "path-browserify"
import React, { useEffect, useState } from "react"
import { postJson } from "../../../helpers/fetch"
import { IconButton } from "../../../ui"
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
      <section className={ "p-2 flex items-center bg-container-bg gap-2" }>
        <IconButton
          onClick={ () => {
            setCurrentPath( path.join( currentPath, ".." ) )
          } }
          icon={ "chevron-left-16" }
        />
        <span>{ currentPath }</span>
      </section>
      {
        files.map( ( file, ind ) => (
          <button
            type={ "button" }
            key={ file.name }
            onClick={ () => {
              setCurrentPath( path.join( currentPath, file.name ) )
            } }
            className={
              clippy(
                ind % 2 === 0
                  ? "bg-slate-700 hover:bg-slate-800 active:bg-slate-900"
                  : "bg-slate-600 hover:bg-slate-500 active:bg-slate-400",
                "pl-2 pr-2 pt-0.5 pb-0.5 text-left transition-colors [transition:var(--transition)]" +
                " hover:[transition:var(--transition-fast)] justify-between flex items-center"
              )
            }
          >
            <span>{ file.name }</span>
            <span>{ file.type }</span>
          </button>
        ) )
      }
    </FilesLayout>
  )
}

export default FilesApplication
