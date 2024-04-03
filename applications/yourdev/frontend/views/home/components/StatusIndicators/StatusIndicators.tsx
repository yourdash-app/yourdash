/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import React, { useEffect, useState } from "react";
import Indicator from "./components/indicator/Indicator";
import csi from "@yourdash/csi/csi";
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
      auth: {
        token: csi.getUserToken(),
        username: csi.getUsername(),
      },
    });

    socket.on("connect", () => {
      console.log("connected");
      socket.emit("message", "hello");
    });

    socket.on("message", () => {
      setInfoLogs(infoLogs + 1);
      socket.emit("message", "hello");
      console.log("hello");
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

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={"ml-auto flex gap-2 items-center"}>
      <Indicator icon={UKIcon.Info} color={"#32b3ff"} displayName={"Info Logs"} value={infoLogs} />
      <Indicator icon={UKIcon.Plug} color={"#ffffff"} displayName={"Websocket Connections"} value={webSocketConnections} />
      <Indicator icon={UKIcon.Alert} color={"#eab842"} displayName={"Warning Logs"} value={warningLogs} />
      <Indicator icon={UKIcon.XCircle} color={"#ff6633"} displayName={"Error Logs"} value={errorLogs} />
      <Indicator icon={UKIcon.Bug} color={"#0ac700"} displayName={"Debug Logs"} value={debugLogs} />
    </div>
  );
};

export default StatusIndicators;
