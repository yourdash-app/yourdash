/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import styles from "./flex.module.scss";
import { FC, ReactNode } from "react";

const Flex: FC<{ direction: "row" | "column"; extraClass?: string; children: ReactNode | ReactNode[] }> = (props) => {
  return <div className={`${styles.component} ${styles[props.direction]} ${props.extraClass}`}>{props.children}</div>;
};

export default Flex;
