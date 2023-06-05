import styles from "./TextBox.module.scss"
import React from "react"

export interface ITextBox extends React.ComponentPropsWithoutRef<"textarea"> {
  defaultValue?: string;
  className?: string;
}

const TextBox: React.FC<ITextBox> = ( {
  children, defaultValue, className, ...inputProps
} ) => {
  return (
    <textarea
      { ...inputProps }
      onKeyDown={ e => {
        if ( e.key === "Tab" ) {
          e.preventDefault()
          e.stopPropagation()
        }
      } }
      defaultValue={ defaultValue ? defaultValue : "" }
      className={ `${styles.textarea} ${className}` }
    >{children}</textarea>
  )
}

export default TextBox
