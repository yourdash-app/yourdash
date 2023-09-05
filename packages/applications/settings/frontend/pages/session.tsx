/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useState, useEffect } from "react";
import { Card, Icon, IconButton } from "web-client/src/ui";
import csi from "web-client/src/helpers/csi";
import { type IYourDashSession, YourDashSessionType } from "shared/core/session";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const SettingsPageSession: React.FC = () => {
  const [reloadNum, setReloadNum] = useState( 0 );
  const [sessions, setSessions] = useState<IYourDashSession<any>[]>( [] );
  const [personalServerAccelerationSessions, setPersonalServerAcceleration] = useState<IYourDashSession<YourDashSessionType.desktop>[]>( [] );
  
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
  }, [reloadNum] );
  
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
              <Card className={"p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]"} key={session.id}>
                <div className={"font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full"}>
                  {
                    session.id
                  }
                  {
                    session.type === YourDashSessionType.web && (
                      <Icon
                        className={"aspect-square h-8 m-auto ml-0"}
                        icon={YourDashIcon.Browser}
                      />
                    )
                  }
                  {
                    session.type === YourDashSessionType.cli && (
                      <Icon
                        className={"aspect-square h-8 m-auto ml-0"}
                        icon={YourDashIcon.Terminal}
                      />
                    )
                  }
                  {
                    session.type === YourDashSessionType.desktop && (
                      <Icon
                        className={"aspect-square h-8 m-auto ml-0"}
                        icon={YourDashIcon.DeviceDesktop}
                      />
                    )
                  }
                  {
                    session.type === YourDashSessionType.external && (
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
                      session.type === YourDashSessionType.web && "Web"
                    }
                    {
                      session.type === YourDashSessionType.cli && "Cli"
                    }
                    {
                      session.type === YourDashSessionType.desktop && "Desktop"
                    }
                    {
                      session.type === YourDashSessionType.external && "External"
                    }
                  </span>
                  <IconButton
                    icon={YourDashIcon.X}
                    onClick={() => {
                      csi.deleteJson( `/core/session/${ session.id }`, data => {
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
              <Card className={"p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]"} key={session.id}>
                <div className={"font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full"}>
                  {session.id}
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
                      csi.deleteJson( `/core/session/${ session.id }`, data => {
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
