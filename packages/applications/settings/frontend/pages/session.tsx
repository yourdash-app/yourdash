/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState, useEffect } from "react";
import { Card, Icon, IconButton } from "web-client/src/ui";
import csi from "web-client/src/helpers/csi";
import { type IYourDashSession, YOURDASH_SESSION_TYPE } from "shared/core/session";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const SettingsPageSession: React.FC = () => {
  const [ reloadNum, setReloadNum ] = useState( 0 );
  const [ sessions, setSessions ] = useState<IYourDashSession<YOURDASH_SESSION_TYPE>[]>( [] );
  const [ personalServerAccelerationSessions, setPersonalServerAcceleration ] = useState<IYourDashSession<YOURDASH_SESSION_TYPE.desktop>[]>( [] );

  useEffect( () => {
    // setSessions( [
    //   {
    //     id: 2,
    //     sessionToken: "ihfuiehwuifvbweh",
    //     type: YourDashSessionType.psa,
    //     ip: "localhost"
    //   },
    //   {
    //     id: 3,
    //     sessionToken: "klsjviojqpowjnfj",
    //     type: YourDashSessionType.cli,
    //     ip: "127.0.0.1"
    //   },
    //   {
    //     id: 4,
    //     sessionToken: "jvklwrnkmnvjeioq",
    //     type: YourDashSessionType.external,
    //     ip: "127.0.0.2"
    //   },
    //   {
    //     id: 5,
    //     sessionToken: "kjgiwejoijejwhjw",
    //     type: YourDashSessionType.web,
    //     ip: "127.0.0.3"
    //   }
    // ] )
    csi.getJson( "/core/sessions", data => {
      setSessions( data.sessions );
    } );

    csi.getJson( "/core/personal-server-accelerator/sessions", data => {
      setPersonalServerAcceleration( data.sessions );
    } );
  }, [ reloadNum ] );

  return (
    <div className={"h-full overflow-auto"}>
      <h1
        className={"font-bold text-container-fg text-4xl tracking-wide pb-4 pt-4 pl-6 pr-6 bg-container-bg"}
      >
        YourDash Settings | Sessions
      </h1>
      <main className={"ml-auto mr-auto w-full max-w-5xl p-4"}>
        <h2 className={"ml-auto mr-auto w-full max-w-5xl font-semibold text-4xl tracking-wide pb-2"}>Sessions</h2>
        <section className={"gap-2 flex flex-wrap"}>
          {
            sessions.map( session => (
              <Card className={"p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]"} key={session.sessionId}>
                <div className={"font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full"}>
                  {
                    session.sessionId
                  }
                  {
                    session.type === YOURDASH_SESSION_TYPE.web && (
                      <Icon
                        className={"aspect-square h-8 m-auto ml-0"}
                        icon={YourDashIcon.Browser}
                      />
                    )
                  }
                  {
                    session.type === YOURDASH_SESSION_TYPE.cli && (
                      <Icon
                        className={"aspect-square h-8 m-auto ml-0"}
                        icon={YourDashIcon.Terminal}
                      />
                    )
                  }
                  {
                    session.type === YOURDASH_SESSION_TYPE.desktop && (
                      <Icon
                        className={"aspect-square h-8 m-auto ml-0"}
                        icon={YourDashIcon.DeviceDesktop}
                      />
                    )
                  }
                  {
                    session.type === YOURDASH_SESSION_TYPE.external && (
                      <Icon
                        className={"aspect-square h-8 m-auto ml-0"}
                        icon={YourDashIcon.Question}
                      />
                    )
                  }
                </div>
                <div className={"w-full bg-container-secondary-bg pl-4 p-3 flex text-container-fg items-center justify-between"}>
                  <span>
                    {
                      session.type === YOURDASH_SESSION_TYPE.web && "Web"
                    }
                    {
                      session.type === YOURDASH_SESSION_TYPE.cli && "Cli"
                    }
                    {
                      session.type === YOURDASH_SESSION_TYPE.desktop && "Desktop"
                    }
                    {
                      session.type === YOURDASH_SESSION_TYPE.external && "External"
                    }
                  </span>
                  <IconButton
                    icon={YourDashIcon.X}
                    onClick={() => {
                      csi.deleteJson( `/core/session/${ session.sessionId }`, () => {
                        setReloadNum( reloadNum + 1 );
                      } );
                    }}
                  />
                </div>
              </Card>
            ) )
          }
        </section>

        <h2 className={"ml-auto mr-auto w-full max-w-5xl font-semibold text-4xl tracking-wide pb-2 pt-8"}>PSA Supported Sessions</h2>
        <section className={"gap-2 flex flex-wrap"}>
          {
            personalServerAccelerationSessions.map( session => (
              <Card className={"p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]"} key={session.sessionId}>
                <div className={"font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full"}>
                  {session.sessionId}
                  <Icon
                    className={"aspect-square h-8 m-auto ml-0"}
                    icon={YourDashIcon.DeviceDesktop}
                  />
                </div>
                <div className={"w-full bg-container-secondary-bg pl-4 p-3 flex text-container-fg justify-between items-center"}>
                  <span>
                    {"Desktop"}
                  </span>
                  <IconButton
                    icon={YourDashIcon.X}
                    onClick={() => {
                      csi.deleteJson( `/core/session/${ session.sessionId }`, () => {
                        setReloadNum( reloadNum + 1 );
                      } );
                    }}
                  />
                </div>
              </Card>
            ) )
          }
        </section>
      </main>
    </div>
  );
};

export default SettingsPageSession;
