import React, { useState, useEffect } from "react"
import { IYourDashSession, YourDashSessionType } from "shared/core/session"
import { Button, Card, Icon, Row } from "../../../../../../ui"
import csi from "helpers/csi"

const SettingsPersonalServerAcceleratorSection: React.FC = () => {
  const [psaSessions, setPsaSessions] = useState<IYourDashSession<YourDashSessionType.desktop>[]>( [] )
  const [selectedSession, setSelectedSession] = useState<IYourDashSession<YourDashSessionType.desktop> | null>( null )

  useEffect( () => {

    csi.getJson( "/core/personal-server-accelerator/sessions", data => {
      setPsaSessions( data.sessions )
    } )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  return (
    <div>
      <h2>Personal Server Accelerator DEBUGGER</h2>
      <main>
        <section>
          <h2>Select a session: Session { selectedSession?.id || 0 } selected</h2>
          <Row>
            {
              psaSessions.map( session => {
                return (
                  <Card
                    onClick={ () => {
                      setSelectedSession( session )
                    } }
                    className={ "p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]" }
                    key={ session.id }
                  >
                    <div className={ "font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full" }>
                      { session.id }
                      <Icon
                        className={ "aspect-square h-8 m-auto ml-0" }
                        name={ "device-desktop-16" }
                      />
                    </div>
                  </Card>
                )
              } )
            }
          </Row>
        </section>
        <Button onClick={ () => {
          csi.getJson( `/app/settings/debug/psa/update/${ selectedSession?.id || 0 }`, data => {
            return 0
          } )
        } }
        >Trigger update</Button>
      </main>
    </div>
  )
}

export default SettingsPersonalServerAcceleratorSection
