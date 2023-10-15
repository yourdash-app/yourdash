/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "../../../helpers/clippy";
import { Card } from "../../index";
import IToast from "./IToast";
import styles from "./Toast.module.scss"

const Toast: React.FC<IToast> = ( { message, type, params } ) => {
  return <Card className={clippy( styles.toast, "animate__animated animate__fadeInUp" )} showBorder data-type={type}>
    <section>
      { type }
    </section>
    { message }
  </Card>
}

export default Toast
