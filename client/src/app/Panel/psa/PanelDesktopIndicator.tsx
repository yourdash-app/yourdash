import React, {useState, useEffect} from "react";
import {IconButton} from "../../../ui";
import {PanelPosition} from "../Panel";
import clippy from "helpers/clippy";

const PanelDesktopIndicator: React.FC<{ side: PanelPosition }> = ({side}) => {
  const [visible, setVisible] = useState(false);
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("desktop_mode")) {
      setIsDesktopMode(true);
    }
  }, []);

  if (!isDesktopMode) {
    return null;
  }

  return (
    <div className={"relative"}>
      <IconButton
        icon={"server-16"}
        onClick={() => {
          setVisible(!visible);
        }}
      />
      {
        visible && (
          <div className={clippy(
            side === PanelPosition.left && "left-full top-0 ml-4",
            side === PanelPosition.top && "top-full left-0 mt-4",
            side === PanelPosition.right && "right-full top-0 mr-4",
            side === PanelPosition.bottom && "bottom-full left-0 mb-4",
            "absolute bg-container-bg border-[1px] border-container-border p-2 rounded-lg w-64")}
          >
            <span>Personal Server Accelerator</span>
            <span/>
          </div>
        )
      }
    </div>
  );
};

export default PanelDesktopIndicator;
