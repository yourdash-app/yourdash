import React, {useState} from "react";

import clippy from "../../../helpers/clippy";
import {IconButton} from "../../../ui";
import {PanelPosition} from "../Panel";

import PanelApplicationLauncherPopOut from "./popout/PanelPopoutLauncher";
import PanelApplicationLauncherSlideOut from "./slideout/PanelSlideoutLauncher";

const PanelApplicationLauncher: React.FC<{
  side: PanelPosition;
  type: number;
  num: number
}> = ({
  side,
  type,
  num
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div
      className={
        clippy(
          side === PanelPosition.left || side === PanelPosition.right
            ? "w-full mb-1"
            : "h-full mr-1",
          type !== 1 && "relative"
        )
      }
    >
      <IconButton
        icon={"app-launcher-16"}
        className={"p-0.5"}
        onClick={() => setIsVisible(!isVisible)}
      />
      {
        type === 1
          ? (
            <PanelApplicationLauncherSlideOut
              num={num}
              side={side}
              visible={isVisible}
              setVisible={val => setIsVisible(val)}
            />
          )
          : (
            <PanelApplicationLauncherPopOut
              num={num}
              side={side}
              visible={isVisible}
              setVisible={val => setIsVisible(val)}
            />
          )
      }
    </div>
  );
};

export default PanelApplicationLauncher;
