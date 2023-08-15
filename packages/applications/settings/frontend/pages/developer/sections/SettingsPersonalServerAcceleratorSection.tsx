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
import { IYourDashSession, YourDashSessionType } from "shared/core/session";
import { Button, Card, Icon, Row } from "web-client/src/ui";
import csi from "web-client/src/helpers/csi";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const SettingsPersonalServerAcceleratorSection: React.FC = () => {
  const [psaSessions, setPsaSessions] = useState<IYourDashSession<YourDashSessionType.desktop>[]>( [] );
  const [selectedSession, setSelectedSession] = useState<IYourDashSession<YourDashSessionType.desktop> | null>( null );
  
  useEffect( () => {
    
    csi.getJson( "/core/personal-server-accelerator/sessions", data => {
      setPsaSessions( data.sessions );
    } );
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        icon={YourDashIcon.DeviceDesktop16}
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
