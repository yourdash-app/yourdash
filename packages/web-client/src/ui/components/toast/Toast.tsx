/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "../../../helpers/clippy";
import { Card } from "../../index";
import IToast from "./IToast";
import styles from "./Toast.module.scss";

const Toast: React.FC<IToast> = ({ message, type, params, uuid, title }) => {
  return (
    <Card
      className={clippy(styles.toast, "animate__animated animate__fadeInUp")}
      showBorder
      data-type={type}
      data-uuid={uuid}
    >
      <section className={styles.header}>{title}</section>
      <section className={styles.body}>{message}</section>
      <section className={styles.options}>
        {params?.options?.map(({ name, cb }) => {
          return (
            <button key={name} onClick={cb}>
              {name}
            </button>
          );
        })}
      </section>
    </Card>
  );
};

export default Toast;
