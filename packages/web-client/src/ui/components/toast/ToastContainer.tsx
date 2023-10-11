/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Toast from "./Toast";

const ToastContainer: React.FC<{ toasts: {message: string, type: "success" | "error" | "info" | "warn"}[]}> = ( { toasts } ) => {
  return <div className={"fixed bottom-0 right-0 gap-2 flex flex-col pr-2 pb-2"}>
    {
      toasts.map( toast => {
        return <Toast
          key={ toast.message }
          message={ toast.message }
          type={ toast.type }
        />
      } )
    }
  </div>
}

export default ToastContainer
