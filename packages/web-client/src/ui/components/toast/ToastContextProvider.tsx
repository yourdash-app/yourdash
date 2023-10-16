/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import IToast from "./IToast";
import ToastContainer from "./ToastContainer";
import ToastContext, { IToastContext } from "./ToastContext";

const ToastContextProvider: React.FC<{ children: React.ReactNode }> = ( { children } ) => {
  const [ toasts, setToasts ] = React.useState<IToast[]>( [] );
  
  return <ToastContext.Provider value={
    ( ( props: IToast ) => {
      setToasts( [ ...toasts, props ] );
      
      if ( props.params?.noAutoClose )
        return
        
      // remove toast after 10 seconds
      setTimeout( () => {
        setToasts( ( prevToasts ) => {
          return prevToasts.filter( ( toast ) => toast.message !== props.message );
        } );
      }, 7500 );
    } ) as IToastContext
  }>
    <ToastContainer toasts={ toasts } />
    { children }
  </ToastContext.Provider>;
};

export default ToastContextProvider;
