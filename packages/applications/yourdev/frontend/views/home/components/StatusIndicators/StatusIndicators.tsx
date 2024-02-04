/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import { YourDashIcon } from "@yourdash/web-client/src/ui/index";
import Indicator from "./components/indicator/Indicator";
import csi from "@yourdash/web-client/src/helpers/csi";
import io from "socket.io-client";

const StatusIndicators: React.FC = () => {
  const [webSocketConnections, setWebSocketConnections] = useState(0);
  const [infoLogs, setInfoLogs] = useState(0);
  const [warningLogs, setWarningLogs] = useState(0);
  const [errorLogs, setErrorLogs] = useState(0);
  const [debugLogs, setDebugLogs] = useState(0);

  useEffect(() => {
    const socket = io(`${csi.getInstanceUrl().replace("https://", "wss://").replace("http://", "ws://")}`, {
      path: "/app/yourdev/websocket-manager/websocket",
    });
    socket.on("connect", () => {
      return 1;
    });
    socket.on("info", () => {
      setInfoLogs(infoLogs + 1);
    });
    socket.on("warning", () => {
      setWarningLogs(warningLogs + 1);
    });
    socket.on("error", () => {
      setErrorLogs(errorLogs + 1);
    });
    socket.on("debug", () => {
      setDebugLogs(debugLogs + 1);
    });
    socket.on("disconnect", () => {
      return 1;
    });
  }, []);

  return (
    <div className={"ml-auto flex gap-2 items-center"}>
      <Indicator icon={YourDashIcon.Info} color={"#32b3ff"} displayName={"Info Logs"} value={infoLogs} />
      <Indicator
        icon={YourDashIcon.Plug}
        color={"#ffffff"}
        displayName={"Websocket Connections"}
        value={webSocketConnections}
      />
      <Indicator icon={YourDashIcon.Alert} color={"#eab842"} displayName={"Warning Logs"} value={warningLogs} />
      <Indicator icon={YourDashIcon.XCircle} color={"#ff6633"} displayName={"Error Logs"} value={errorLogs} />
      <Indicator icon={YourDashIcon.Bug} color={"#0ac700"} displayName={"Debug Logs"} value={debugLogs} />
    </div>
  );
};

export default StatusIndicators;
