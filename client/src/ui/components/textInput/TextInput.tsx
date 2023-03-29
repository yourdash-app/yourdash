import React, { useState } from "react"

export interface ITextInput {
  onChange: (text: string) => void,
  title?: string,
  mustMatchRegex?: RegExp,
  placeholder?: string
}

const TextInput: React.FC<ITextInput> = ({ onChange, title, mustMatchRegex, placeholder }) => {
  const [ valid, setValid ] = useState( !mustMatchRegex )
  
  return <div className={ `relative transition-all` }>
    <span
        className={ `pl-2 pr-2 bg-base-700 absolute -top-1 left-4 text-sm z-10 [line-height:.65rem] select-none text-base-400` }
    >
      { title }
    </span>
    <input
        placeholder={ placeholder }
        className={ `w-full pl-2 pt-1 pb-1 pr-2 outline-none relative z-0 rounded-lg bg-base-700 transition-all ${ !!mustMatchRegex &&
                                                                                                                   (valid
                                                                                                                    ? "hover:border-green-400 focus-within:border-green-400 border-2 border-base-600"
                                                                                                                    : "border-2 border-red-400") }` }
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
