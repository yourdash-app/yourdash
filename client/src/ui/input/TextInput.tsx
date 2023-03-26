import React, { useState } from "react"

export interface ITextInput {
  onChange: (text: string) => void,
  title?: string,
  mustMatchRegex?: RegExp,
  placeholder?: string
}

const TextInput: React.FC<ITextInput> = ({ onChange, title, mustMatchRegex, placeholder }) => {
  const [ valid, setValid ] = useState(
      !mustMatchRegex
  )
  
  return <div className={ `relative rounded-lg transition-all overflow-hidden ${ !!mustMatchRegex && (
      valid
      ? "hover:outline-2 focus-within:outline-2 outline outline-0 outline-green-400"
      : "outline-2 outline-red-400 outline"
  ) }` }>
    <span className={ `bg-inherit` }>{ title }</span>
    <input
        placeholder={ placeholder }
        className={ `w-full pl-2 pt-1 pb-1 pr-2 border-none outline-none` }
        type={ `text` }
        onChange={ (e) => {
          const value = e.currentTarget.value
          if (!mustMatchRegex ||
              (value.match( mustMatchRegex ) !== null && value.match( mustMatchRegex )?.length === 1)) {
            setValid( true )
            onChange( value )
          } else {
            setValid( false )
          }
        } }/>
  </div>
}

export default TextInput
