import React, { useEffect, useState } from "react"
import TokenizeString from "./Tokenize";
import styles from "./Editor.module.scss"

export interface IEditor {
  filePath: string,
  displayName: string,
  onChange: (content: string) => void,
  content: string
}

const Editor: React.FC<IEditor> = ({ filePath, displayName, onChange, content }) => {
  const [ rawHtml, setRawHtml ] = useState("")

  useEffect(() => {
    function processString(str: string): string {
      const tokens = TokenizeString(str)

      let output = ""

      tokens.forEach(line => {
        let lineOutput = ""

        line.forEach(token => {
          lineOutput += `<span class="${styles[`token-styles-${token.type}`]}">${token.content}</span>`
        })

        output += `<span>${lineOutput}\n</span>`
      })

      output = output.replaceAll("\n", "<br>")
      return output
    }

    setRawHtml(processString(content))
  }, [ content ])

  return (
      <main dangerouslySetInnerHTML={{ __html: rawHtml }}/>
  )
}

export default Editor
