/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card.tsx";
import Heading from "@yourdash/chiplet/components/heading/Heading.tsx";
import Spinner from "@yourdash/chiplet/components/spinner/Spinner.tsx";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import coreCSI from "@yourdash/csi/coreCSI.ts";
import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import Button from "@yourdash/chiplet/components/button/Button.tsx";
import PanelLayout from "./panel/PanelLayout.tsx";
import React, { useEffect } from "react";
import styles from "./AppLayout.module.scss";

const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [didTakeTooLong, setDidTakeTooLong] = React.useState<boolean>(false);
  const isStandalone = new URLSearchParams(window.location.search).has("standalone");

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
              <Spinner />
              <Card
                className={"flex items-center justify-center"}
                showBorder
              >
                <h1 className={"text-5xl font-bold pl-4 pr-4"}>Loading YourDash</h1>
              </Card>
            </>
          )}
          <Card
            className={clippy("text-center animate__animated animate__fadeInUp", didTakeTooLong ? "" : "fixed bottom-4")}
            showBorder
          >
            <div className={"pl-2 pr-2"}>
              {didTakeTooLong ? (
                <div className={"flex gap-2 flex-col -ml-2 -mr-2 items-center justify-center"}>
                  <div className={"flex items-center justify-center"}>
                    <Heading level={3}>Your instance took too long to load</Heading>
                  </div>
                  <div className={"flex gap-2"}>
                    <Button
                      onClick={() => {
                        window.location.reload();
                      }}
                    >
                      Retry
                    </Button>
                    <Button
                      onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                      }}
                    >
                      Change Instance
                    </Button>
                  </div>
                </div>
              ) : (
                <>This should not take longer than 5 seconds</>
              )}
            </div>
          </Card>
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

  return <PanelLayout />;
};

export default AppLayout;
