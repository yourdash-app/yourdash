/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useContext } from "react";
import IToast from "../ui/components/toast/IToast";
import ToastContext from "../ui/components/toast/ToastContext";

export default function useYourDashLib() {
  const toast = useContext( ToastContext )
  
  return {
    toast: {
      success: ( message: string, options?: IToast["params"] ) => {
        toast( {
          message,
          type: "success",
          params: options
        } )
      },
      error: ( message: string, options?: IToast["params"] ) => {
        toast( {
          message,
          type: "error",
          params: options
        } )
      },
      info: ( message: string, options?: IToast["params"] ) => {
        toast( {
          message,
          type: "info",
          params: options
        } )
      },
      warn: ( message: string, options?: IToast["params"] ) => {
        toast( {
          message,
          type: "warn",
          params: options
        } )
      }
    }
  }
}
