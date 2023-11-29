/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState, useEffect } from "react";
import { IYourDashSession, YOURDASH_SESSION_TYPE } from "shared/core/session";
import { Button, Card, Icon, Row } from "web-client/src/ui/index";
import csi from "web-client/src/helpers/csi";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const SettingsPersonalServerAcceleratorSection: React.FC = () => {
  const [psaSessions, setPsaSessions] = useState<IYourDashSession<YOURDASH_SESSION_TYPE.desktop>[]>( [] );
  const [selectedSession, setSelectedSession] = useState<IYourDashSession<YOURDASH_SESSION_TYPE.desktop> | null>( null );
  
  useEffect( () => {
    csi.getJson( "/core/personal-server-accelerator/sessions", data => {
      setPsaSessions( data.sessions );
    } );
  }, [] );
  
  return (
    <div>
      <h2>{"Personal Server Accelerator DEBUGGER"}</h2>
      <main>
        <section>
          <h2>{`Select a session: Session ${ selectedSession?.id || 0 } selected`}</h2>
          <Row>
            {
              psaSessions.map( session => {
                return (
                  <Card
                    onClick={() => {
                      setSelectedSession( session );
                    }}
                    className={"p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]"}
                    key={session.id}
                  >
                    <div className={"font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full"}>
                      {session.id}
                      <Icon
                        className={"aspect-square h-8 m-auto ml-0"}
                        icon={YourDashIcon.DeviceDesktop}
                      />
                    </div>
                  </Card>
                );
              } )
            }
          </Row>
        </section>
        <Button onClick={() => {
          csi.getJson( `/app/settings/debug/psa/update/${ selectedSession?.id || 0 }`, data => {
            return 0;
          } );
        }}
        >{"Trigger update"}</Button>
      </main>
    </div>
  );
};

export default SettingsPersonalServerAcceleratorSection;
