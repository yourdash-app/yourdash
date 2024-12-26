/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import PanelLayout from "./panel/PanelLayout.tsx";
import React, { useEffect, useState } from "react";
import styles from "./AppLayout.module.scss";
import { UKC } from "@yourdash/uikit";
import ApplicationPanelContext from "./panel/ApplicationPanelContext.tsx";

const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [didTakeTooLong, setDidTakeTooLong] = React.useState<boolean>(false);
  const isStandalone = new URLSearchParams(window.location.search).has("standalone");

  const [applicationDisplayName, setApplicationDisplayName] = useState<string>("");
  const [applicationIcon, setApplicationIcon] = useState<string>("");
  const [controls, setControls] = useState<React.ReactNode[]>([]);
  const [onBackButton, setOnBackButton] = useState<() => void>(() => {});
  const [showBackButton, setShowBackButton] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDidTakeTooLong(true);
    }, 5_000 /* 5 secconds */);

    coreCSI.getUserDB().then(() => {
      setLoaded(true);
      clearTimeout(timer);
    });

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!loaded)
    return (
      <>
        <link
          type={"text/css"}
          rel={"stylesheet"}
          href={`${coreCSI.getInstanceUrl()}/core/theme/${coreCSI.getUsername()}`}
        />
        <div className={"w-full h-full flex items-center justify-center flex-col gap-4"}>
          {!didTakeTooLong && (
            <>
              <UKSpinner />
              <UKCard className={"flex items-center justify-center"}>
                <h1 className={"text-5xl font-bold pl-4 pr-4"}>Loading YourDash</h1>
              </UKCard>
            </>
          )}
          <UKCard className={clippy("text-center animate__animated animate__fadeInUp", didTakeTooLong ? "" : "fixed bottom-4")}>
            <div className={"pl-2 pr-2"}>
              {didTakeTooLong ? (
                <div className={"flex gap-2 flex-col -ml-2 -mr-2 items-center justify-center"}>
                  <div className={"flex items-center justify-center"}>
                    <UKHeading
                      level={3}
                      text={"Your instance took too long to load"}
                    />
                  </div>
                  <div className={"flex gap-2"}>
                    <UKButton
                      onClick={() => {
                        window.location.reload();
                      }}
                      text={"Retry"}
                    />
                    <UKButton
                      onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                      }}
                      text={"Change Instance"}
                    />
                  </div>
                </div>
              ) : (
                <>This should not take longer than 5 seconds</>
              )}
            </div>
          </UKCard>
        </div>
      </>
    );

  // Standalone mode displays only the application and not the Panel
  if (isStandalone) {
    return (
      <div className={styles.applicationFrame}>
        <Outlet />
      </div>
    );
  }

  return (
    <ApplicationPanelContext.Provider
      value={{
        setApplicationDisplayName: (displayName) => {
          setApplicationDisplayName(displayName);
        },
        setApplicationIcon: (applicationIcon) => {
          setApplicationIcon(applicationIcon);
        },
        setControls: (controls) => {
          setControls(controls);
        },
        setOnBackButton: (cb) => {
          setOnBackButton(cb);
        },
        setShowBackButton: (showBackButton) => {
          setShowBackButton(showBackButton);
        },
      }}
    >
      <PanelLayout
        applicationDisplayName={applicationDisplayName}
        applicationIcon={applicationIcon}
        controls={controls}
        onBackButton={onBackButton}
        showBackButton={showBackButton}
      />
    </ApplicationPanelContext.Provider>
  );
};

export default AppLayout;
