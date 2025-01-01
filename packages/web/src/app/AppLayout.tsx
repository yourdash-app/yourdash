/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKButton from "@yourdash/uikit/components/button/UKButton.js";
import UKHeading from "@yourdash/uikit/components/heading/UKHeading.js";
import UKText from "@yourdash/uikit/components/text/UKText.js";
import UKFlex from "@yourdash/uikit/components/flex/UKFlex.js";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import PanelLayout from "./panel/PanelLayout.tsx";
import React, { useEffect, useState } from "react";
import styles from "./AppLayout.module.scss";
import ApplicationPanelContext from "./panel/ApplicationPanelContext.tsx";
import UKSpinner from "@yourdash/uikit/components/spinner/UKSpinner.js";
import UKCard from "@yourdash/uikit/components/card/UKCard.js";

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
          <div className={"pl-2 pr-2"}>
            {didTakeTooLong ? (
              <UKCard
                header={[
                  <UKHeading
                    level={3}
                    text={"Unable to connect"}
                  />,
                ]}
                actions={[
                  <UKFlex direction={"row"}>
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
                  </UKFlex>,
                ]}
              >
                <UKFlex direction={"column"}>
                  <UKText text={"YourDash was unable to connect to this instance."} />
                  <UKText text={"You can choose to retry or choose to try a different instance."} />
                </UKFlex>
              </UKCard>
            ) : (
              <>This should not take longer than 5 seconds</>
            )}
          </div>
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
