/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react"

export interface INumberInput {
  min?: number,
  max?: number,
  onChange: (value: number) => void
}

const NumberInput: React.FC<INumberInput> = ({ min, max, onChange }) => {
  return <input
      min={ min }
      max={ max }
      type={ "number" }
      onChange={ (e) => {
        if (max !== undefined && parseInt( e.currentTarget.value ) > max) {
          e.currentTarget.value = max.toString()
        }
        if (min !== undefined && parseInt( e.currentTarget.value ) < min) {
          e.currentTarget.value = min.toString()
        }
      } }
      className={ `w-full outline-none rounded-lg pl-2 pt-1 pb-1 pr-2` }
  ></input>
}

export default NumberInput
