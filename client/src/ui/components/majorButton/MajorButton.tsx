import React from "react"

export interface IMajorButton extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
}

const MajorButton: React.FC<IMajorButton> = ( { children, className, ...extraProps } ) => {
  return (
    <button
      type="button"
      { ...extraProps }
      className={ `pl-8 pr-8 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full font-normal tracking-normal disabled:bg-gray-700 disabled:hover:bg-gray-600 disabled:active:bg-gray-500 ${ className }` }
    >
      { children }
    </button>
  )
}

export default MajorButton
