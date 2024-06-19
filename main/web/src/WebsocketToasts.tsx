/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import useWebsocketConnection from "@yourdash/csi/useWebsocketConnection";
import useYourDashLib from "@yourdash/shared/web/helpers/ydsh";
import React, { useEffect } from "react";
import stripAnsi from "strip-ansi";

enum LOG_TYPE {
  INFO,
  WARNING,
  ERROR,
  SUCCESS,
  DEBUG,
}

const WebsocketToasts: React.FC = () => {
  const wsc = useWebsocketConnection("/core::log");
  const ydsh = useYourDashLib();

  useEffect(() => {
    if (!wsc) return;

    wsc.onAny((data) => {
      console.log(data);
    });

    wsc.on(LOG_TYPE.INFO.toString(), (data: string[]) => {
      ydsh.toast.info(data[0], stripAnsi(data.slice(1).join("\n")).replaceAll("", ""));
    });

    wsc.on(LOG_TYPE.WARNING.toString(), (data: string[]) => {
      ydsh.toast.warn(data[0], stripAnsi(data.slice(1).join("\n")).replaceAll("", ""));
    });

    wsc.on(LOG_TYPE.ERROR.toString(), (data: string[]) => {
      ydsh.toast.error(data[0], stripAnsi(data.slice(1).join("\n")).replaceAll("", ""));
    });

    wsc.on(LOG_TYPE.SUCCESS.toString(), (data: string[]) => {
      ydsh.toast.success(data[0], stripAnsi(data.slice(1).join("\n")).replaceAll("", ""));
    });

    wsc.on(LOG_TYPE.DEBUG.toString(), (data: string[]) => {
      ydsh.toast.debug(data[0], stripAnsi(data.slice(1).join("\n")).replaceAll("", ""));
    });
  }, [wsc]);

  return <></>;
};

export default WebsocketToasts;
