/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { FC, useEffect, useState } from "react";
import ClockWidget from "./widgets/clock/widget";
import styles from "./menubar.module.scss";

const MenuBar: FC = () => {
  const [widgets, setWidgets] = useState<React.ReactNode[]>([<ClockWidget />]);

  useEffect(() => {}, []);

  return <div className={styles.menubar}>{widgets}</div>;
};

export default MenuBar;
