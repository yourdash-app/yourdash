import React from "react"
import isMobileDevice from "../../helpers/isPhone";

export interface IDialog {
  children: React.ReactNode,
  dontAllowClosing?: boolean,
}

const Dialog: React.FC<IDialog> = ({ children }) => {
  const isMobile = isMobileDevice()
  
  return <div
      className={ `fixed top-0 left-0 w-screen h-screen z-50 flex justify-center ${ isMobile
                                                                                    ? "items-end"
                                                                                    : "items-center" } bg-black bg-opacity-10` }>
    <main className={ `bg-base-700 overflow-hidden ${ isMobile
                                                      ? ""
                                                      : "max-w-5xl rounded-none lg:rounded-xl flex flex-col gap-2" }` }>
      { children }
    </main>
  </div>
}

export default Dialog
