/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect, useState } from "react";
import styles from "./widget.module.scss";

let interval: NodeJS.Timer;

const ClockWidget = () => {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval as unknown as number);
    };
  }, []);

  return <div className={styles.clockWidget}>{time}</div>;
};

export default ClockWidget;
