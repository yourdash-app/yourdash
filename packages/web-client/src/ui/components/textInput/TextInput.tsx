import clippy from "web-client/src/helpers/clippy";
import React, { useState, FocusEventHandler } from "react";

export interface ITextInput {
  onChange: ( text: string ) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  label?: string;
  mustMatchRegex?: RegExp;
  placeholder?: string;
  className?: string;
  // @ts-ignore
  onKeyDown?: ( e: KeyboardEvent<HTMLInputElement> ) => void,
  defaultValue?: string
}

const TextInput: React.FC<ITextInput> = ( {
  onChange,
  onBlur,
  label,
  mustMatchRegex,
  placeholder,
  className,
  onKeyDown,
  defaultValue
} ) => {
  const [valid, setValid] = useState( !mustMatchRegex );

  return (
    <div className={clippy( "relative transition-all", className )}>
      <span
        className={clippy( "pl-2 pr-2 bg-base-700 absolute -top-1 left-2.5 text-sm z-10 [line-height:.65rem]" +
                           " select-none text-base-400" )}
      >
        {label}
      </span>
      <input
        placeholder={placeholder}
        className={`w-full pl-2 pt-1 pb-1 pr-2 outline-none relative z-0 rounded-button-rounding bg-base-700 transition-all ${
          mustMatchRegex
            ? valid
              ? "hover:border-green-400 focus-within:border-green-400 border-2 border-base-600"
              : "border-2 border-red-400"
            : "border-2 border-base-600"
        }`}
        type={"text"}
        onBlur={onBlur}
        defaultValue={defaultValue}
        onKeyDown={e => onKeyDown?.( e )}
        onChange={e => {
          const value = e.currentTarget.value;
          onChange( value );
          if (
            !mustMatchRegex ||
            ( value.match( mustMatchRegex ) !== null &&
             value.match( mustMatchRegex )?.length === 1 )
          ) {
            setValid( true );
          } else {
            setValid( false );
          }
        }}
      />
    </div>
  );
};

export default TextInput;
