/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useContext } from "react";
import ToastContext from "../ui/components/toast/ToastContext";

export default function useYourDashLib() {
  const toast = useContext( ToastContext )
  
  return {
    toast: {
      success: ( message: string ) => {
        toast.success( message )
      },
      error: ( message: string ) => {
        toast.error( message )
      },
      info: ( message: string ) => {
        toast.info( message )
      },
      warn: ( message: string ) => {
        toast.warn( message )
      }
    }
  }
}
