import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Panel, { PanelPosition } from "./Panel/Panel";

const Layout: React.FC = () => {
  const [panelLayout, setPanelLayout] = useState<PanelPosition>(
    PanelPosition.left
  );
  return (
    <div
      style={{
        ...(panelLayout === PanelPosition.left ||
        panelLayout === PanelPosition.right
          ? {
              gridTemplateColumns:
                panelLayout === PanelPosition.left ? "auto 1fr" : "1fr auto",
            }
          : {
              gridTemplateRows:
                panelLayout === PanelPosition.top ? "auto 1fr" : "1fr auto",
            }),
      }}
      className={`grid h-screen`}
    >
      <Panel setSide={(val) => setPanelLayout(val)} side={panelLayout} />
      <Outlet />
    </div>
  );
};

export default Layout;
