/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import IToast from "./IToast";
import Toast from "./Toast";
import styles from "./Toast.module.scss";

const ToastContainer: React.FC<{ toasts: IToast[] }> = ({ toasts }) => {
  return (
    <div className={styles.toastsRootContainer}>
      {toasts.map((toast) => {
        return <Toast key={toast.uuid} message={toast.message} type={toast.type} title={toast.title} params={toast.params} uuid={toast.uuid} />;
      })}
    </div>
  );
};

export default ToastContainer;
