import clippy from "helpers/clippy"
import React, { useState } from "react"
import FilesLayout from "./FilesLayout"

const FilesApplication: React.FC = () => {
  const [files, setFiles] = useState<{ path: string, type: "dir" | "file" }[]>( [
    {
      path: "generous",
      type: "dir"
    },
    {
      path: "soup",
      type: "dir"
    },
    {
      path: "try",
      type: "dir"
    },
    {
      path: "cup",
      type: "dir"
    },
    {
      path: "entrance",
      type: "dir"
    },
    {
      path: "give",
      type: "dir"
    },
    {
      path: "clear",
      type: "dir"
    },
    {
      path: "outline",
      type: "dir"
    }
  ] )

  return (
    <FilesLayout>
      {
        files.map( ( file, ind ) => (
          <button
            type={ "button" }
            key={ file.path }
            className={
              clippy(
                ind % 2 === 0
                  ? "bg-slate-700 hover:bg-slate-600 active:bg-slate-500"
                  : "bg-slate-600 hover:bg-slate-500 active:bg-slate-400",
                "pl-1 pt-0.5 pb-0.5 text-left transition-colors"
              )
            }
          >{ file.type } { file.path }</button>
        ) )
      }
    </FilesLayout>
  )
}

export default FilesApplication
