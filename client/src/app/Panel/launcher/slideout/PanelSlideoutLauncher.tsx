import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import clippy from "../../../../helpers/clippy";
import csi from "../../../../helpers/csi";
import {PanelPosition, YourDashLauncherApplication} from "../../Panel";
import LauncherGridView from "../sharedComponents/LauncherGridView";
import LauncherDateAndTime from "../sharedComponents/LauncherDateAndTime";
import {IconButton, Row} from "../../../../ui";

const PanelApplicationLauncherSlideOut: React.FC<{
  side: PanelPosition;
  visible: boolean;
  setVisible: (value: boolean) => void;
}> = ({
  side,
  visible,
  setVisible
}) => {
  const navigate = useNavigate();

  const [userFullName, setUserFullName] = useState<{
    first: string;
    last: string;
  }>({
    first: "",
    last: ""
  });

  const [applications, setApplications] = useState<
    YourDashLauncherApplication[]
  >([]);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    csi.getJson("/core/panel/user-full-name", res => {
      setUserFullName(res);
    });

    csi.getJson("/core/panel/applications", res => {
      setApplications(res);
    });
  }, []);

  return (
    <section
      className={
        clippy(
          side === PanelPosition.left
            ? "left-full top-0 animate__fadeIn"
            : side === PanelPosition.right
              ? "right-full top-0 animate__fadeIn"
              : side === PanelPosition.top
                ? "top-full left-0 animate__fadeIn"
                : /* must be bottom*/ "bottom-full left-0 animate__fadeIn",
          visible ? "flex" : "hidden",
          "absolute w-[32rem] bg-container-bg h-screen animate__animated z-0 flex-col gap-2"
        )
      }
      style={{
        ...(side === PanelPosition.left && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        }),
        ...(side === PanelPosition.right && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        }),
        ...(side === PanelPosition.top && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        }),
        ...(side === PanelPosition.bottom && {
          borderRight: "0.1rem solid var(--application-panel-border)"
        })
      }}
    >
      <header
        style={{
          // FIXME: this will only work during development, this needs urgently changing
          backgroundImage: "url(\"http://localhost:3560/login/background\")"
        }}
        className={"h-32 flex items-center justify-center w-full bg-cover bg-center"}
      >
        <span
          className={clippy(
            "text-container-fg text-4xl font-bold" +
            " [filter:_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))" +
            " _drop-shadow(0_4px_3px_rgb(0_0_0/0.1))] backdrop-blur-sm bg-container-bg bg-opacity-50 pl-4 pr-4 pt-2 pb-2 rounded-2xl" +
            " overflow-hidden"
          )}
        >
          Hiya, {userFullName.first}
        </span>
      </header>
      <LauncherGridView applications={applications} setVisible={setVisible} searchValue={searchValue}/>
      <footer className={"bg-container-secondary-bg border-t-2 border-t-container-secondary-border text-container-secondary-fg mt-auto flex p-2 items-center"}>
        <LauncherDateAndTime/>
        <Row className={"ml-auto"}>
          <IconButton
            icon={"person-16"}
            onClick={() => {
              setVisible(false);
              navigate("/app/a/profile");
            }}
          />
          <IconButton
            icon={"gear-16"}
            onClick={() => {
              setVisible(false);
              navigate("/app/a/settings");
            }}
          />
          <IconButton
            icon={"logout"}
            onClick={() => {
              setVisible(false);
              localStorage.removeItem("session_token");
              localStorage.removeItem("username");
              navigate("/");
            }}
          />
        </Row>
      </footer>
    </section>
  );
};

export default PanelApplicationLauncherSlideOut;
