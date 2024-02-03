/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState, useEffect } from "react";
import { Card, Icon, IconButton } from "web-client/src/ui/index";
import csi from "web-client/src/helpers/csi";
import {
  type IYourDashSession,
  YOURDASH_SESSION_TYPE,
} from "shared/core/session";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import BasePageLayout from "../../components/BasePageLayout";

const SettingsPageSession: React.FC = () => {
  const [reloadNum, setReloadNum] = useState(0);
  const [sessions, setSessions] = useState<IYourDashSession[]>([]);
  const [personalServerAccelerationSessions, setPersonalServerAcceleration] =
    useState<IYourDashSession<YOURDASH_SESSION_TYPE.desktop>[]>([]);

  useEffect(() => {
    csi.getJson("/user/sessions", (data) => {
      setSessions(data.sessions);
    });

    csi.getJson("/core/personal-server-accelerator/sessions", (data) => {
      setPersonalServerAcceleration(data.sessions);
    });
  }, [reloadNum]);

  return (
    <BasePageLayout title={"Sessions"} noBack={false}>
      <main className={"col-span-2 p-4"}>
        <section className={"gap-2 flex flex-wrap"}>
          {sessions.map((session) => (
            <Card
              className={
                "p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]"
              }
              key={session.sessionId}
            >
              <div
                className={
                  "font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full"
                }
              >
                {session.sessionId}
                <Icon
                  className={"aspect-square h-8 m-auto ml-0"}
                  icon={
                    session.type === YOURDASH_SESSION_TYPE.web
                      ? YourDashIcon.Browser
                      : session.type === YOURDASH_SESSION_TYPE.cli
                        ? YourDashIcon.Terminal
                        : session.type === YOURDASH_SESSION_TYPE.desktop
                          ? YourDashIcon.DeviceDesktop
                          : YourDashIcon.Question
                  }
                />
              </div>
              <div
                className={
                  "w-full bg-container-secondary-bg pl-4 p-3 flex text-container-fg items-center justify-between"
                }
              >
                <div className={"flex flex-col gap-1"}>
                  <div>
                    Type: {session.type === YOURDASH_SESSION_TYPE.web && "Web"}
                    {session.type === YOURDASH_SESSION_TYPE.cli && "Cli"}
                    {session.type === YOURDASH_SESSION_TYPE.desktop &&
                      "Desktop"}
                    {session.type === YOURDASH_SESSION_TYPE.external &&
                      "External"}
                  </div>
                  <div>Supports PSA: {(!!session.isNodeJS).toString()}</div>
                </div>
                <IconButton
                  icon={YourDashIcon.X}
                  onClick={() => {
                    csi.deleteJson(`/core/session/${session.sessionId}`, () => {
                      setReloadNum(reloadNum + 1);
                    });
                  }}
                />
              </div>
            </Card>
          ))}
        </section>
      </main>
    </BasePageLayout>
  );
};

export default SettingsPageSession;
