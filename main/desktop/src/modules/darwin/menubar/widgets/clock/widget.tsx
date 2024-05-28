/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect, useState } from "react";

let interval: NodeJS.Timer;

const ClockWidget = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval as unknown as number);
    };
  }, []);

  return <>{time}</>;
};

export default ClockWidget;
