/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react"
import ToastContainer from "./ToastContainer";
import ToastContext from "./ToastContext";

const ToastContextProvider: React.FC<{ children: React.ReactNode }> = ( { children } ) => {
  const [toasts, setToasts] = React.useState<{ message: string, type: "success" | "error" | "info" | "warn"}[]>( [] )
  
  return <ToastContext.Provider value={( message: string, type: "success" | "error" | "info" | "warn" ) => setToasts( [...toasts, { message: message, type }] )}>
    <ToastContainer toasts={toasts}/>
    {children}
  </ToastContext.Provider>
}

export default ToastContextProvider
