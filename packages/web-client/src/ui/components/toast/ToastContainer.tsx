/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import IToast from "./IToast";
import Toast from "./Toast";
import styles from "./Toast.module.scss"

const ToastContainer: React.FC<{ toasts: IToast[]}> = ( { toasts } ) => {
  return <div className={styles.toastsRootContainer}>
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
