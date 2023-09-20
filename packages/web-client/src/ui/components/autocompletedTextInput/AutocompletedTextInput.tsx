/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "web-client/src/helpers/clippy"
import React, { useState, FocusEventHandler, useRef } from "react"
import { Button, Card } from "../.."

export interface IAutocompletedTextInput {
  onChange: ( text: string ) => void;
  options: string[],
  onBlur?: FocusEventHandler<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  className?: string;
  // @ts-ignore
  onKeyDown?: ( e: KeyboardEvent<HTMLInputElement> ) => void
}

const AutocompletedTextInput: React.FC<IAutocompletedTextInput> = ( {
  onChange,
  options,
  onBlur,
  label,
  placeholder,
  className,
  onKeyDown
} ) => {
  const [valid, setValid] = useState( false )
  const [possibleOptions, setPossibleOptions] = useState<string[]>( [] )
  const ref = useRef<HTMLInputElement>( null )

  return (
    <div
      className={ clippy( "relative transition-all border-none", className ) }
    >
      <span
        className={ clippy( "pl-2 pr-2 bg-base-700 absolute -top-1 left-2.5 text-sm z-10 [line-height:.65rem] select-none text-base-400" ) }
      >
        { label }
      </span>
      <input
        placeholder={ placeholder }
        className={ `w-full pl-2 pt-1 pb-1 pr-2 outline-none relative z-0 rounded-button-rounding bg-base-700 transition-all ${
          valid
            ? "hover:border-green-400 focus-within:border-green-400 border-2 border-base-600"
            : "border-2 border-red-400"
        }` }
        type={ "text" }
        onFocus={ e => {
          if ( options.includes( e.currentTarget.value ) && e.currentTarget.value !== "/" ) {
            setPossibleOptions( [] )
          } else {
            setPossibleOptions( options.filter( opt => {
              return opt.includes( e.currentTarget.value )
            } ) )
          }
        } }
        onBlur={ e => onBlur?.( e ) }
        onKeyDown={ e =>  onKeyDown?.( e ) }
        ref={ ref }
        onChange={ e => {
          const value = e.currentTarget.value

          if ( !value )
            return setValid( false )
          
          onChange( value )

          setPossibleOptions( options.filter( opt => {
            return opt.includes( value )
          } ) )

          if ( options.includes( value ) ) {
            if ( value !== "/" ) {
              setPossibleOptions( [] )
            }
            setValid( true )
          } else {
            setValid( false )
          }
        } }
      />
      {
        possibleOptions.length !== 0 && (
          <Card className={ "absolute top-full z-10 w-max flex flex-col p-2 gap-1" }>
            {
              possibleOptions.slice( 0, 25 ).map( option => {
                return (
                  <Button
                    key={ option }
                    className={ "h-6 whitespace-nowrap w-full text-left" }
                    onClick={ () => {
                      if ( ref.current ) {
                        ref.current.value = option
                        onChange( ref.current.value )
                        setPossibleOptions( [] )
                        setValid( true )
                      }
                    } }
                  >
                    { option }
                  </Button>
                )
              } )
            }
          </Card>
        )
      }
    </div>
  )
}

export default AutocompletedTextInput
