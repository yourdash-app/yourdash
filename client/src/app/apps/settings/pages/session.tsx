import React, { useState, useEffect } from "react"
import { Card, Icon } from "../../../../ui"
import csi from "../../../../helpers/csi"
import Panel from "../../../Panel/Panel"
import { IYourDashSession, YourDashSessionType } from "../../../../../../shared/core/session"

const SetttingsPageSession: React.FC = () => {
  const [sessions, setSessions] = useState<IYourDashSession<any>[]>( [] )
  const [personalServerAccelerationSessions, setPersonalServerAcceleration] = useState<IYourDashSession<YourDashSessionType.desktop>[]>( [] )

  useEffect( () => {
    // setSessions( [
    //   {
    //     id: 2,
    //     sessionToken: "ihfuiehwuifvbweh",
    //     type: YourDashSessionType.desktop,
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
      setSessions( data.sessions )
    } )

    csi.getJson( "/core/personal-server-accelerator/sessions", data => {
      setPersonalServerAcceleration( data.sessions )
    } )
  }, [] )

  return (
    <div className={ "h-full overflow-auto" }>
      <h1
        className={ "font-bold text-container-fg text-4xl tracking-wide pb-4 pt-4 pl-6 pr-6 bg-container-bg" }
      >
        YourDash Settings
      </h1>
      <main className={ "ml-auto mr-auto w-full max-w-5xl p-4" }>
        <h2 className={ "ml-auto mr-auto w-full max-w-5xl font-semibold text-4xl tracking-wide pb-2" }>Sessions</h2>
        <section className={ "gap-2 flex flex-wrap" }>
          {
            sessions.map( session => {
              return (
                <Card className={ "p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]" } key={ session.id }>
                  <div className={ "font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full" }>
                    { session.id }
                    { session.type === YourDashSessionType.web && (
                      <Icon
                        className={ "aspect-square h-8 m-auto ml-0" }
                        name={ "browser-16" }
                      />
                    ) }
                    { session.type === YourDashSessionType.cli && (
                      <Icon
                        className={ "aspect-square h-8 m-auto ml-0" }
                        name={ "terminal-16" }
                      />
                    ) }
                    { session.type === YourDashSessionType.desktop && (
                      <Icon
                        className={ "aspect-square h-8 m-auto ml-0" }
                        name={ "device-desktop-16" }
                      />
                    ) }
                    { session.type === YourDashSessionType.external && (
                      <Icon
                        className={ "aspect-square h-8 m-auto ml-0" }
                        name={ "question-16" }
                      />
                    ) }
                  </div>
                  <div className={ "w-full bg-container-secondary-bg pl-4 p-3 flex flex-col text-container-fg" }>
                    <span className={ "text-container-tertiary-fg font-semibold tracking-wide" }>
                      { session.ip }
                    </span>
                    { session.type === YourDashSessionType.web && "Web" }
                    { session.type === YourDashSessionType.cli && "Cli" }
                    { session.type === YourDashSessionType.desktop && "Desktop" }
                    { session.type === YourDashSessionType.external && "External" }
                  </div>
                </Card>
              )
            } )
          }
        </section>

        <h2 className={ "ml-auto mr-auto w-full max-w-5xl font-semibold text-4xl tracking-wide pb-2 pt-8" }>PSA Sessions</h2>
        <section className={ "gap-2 flex flex-wrap" }>
          {
            personalServerAccelerationSessions.map( session => {
              return (
                <Card className={ "p-0 overflow-hidden flex flex-grow flex-col min-w-[14rem]" } key={ session.id }>
                  <div className={ "font-semibold text-6xl text-container-fg pl-4 pt-2 pb-2 flex gap-4 w-full" }>
                    { session.id }
                    <Icon
                      className={ "aspect-square h-8 m-auto ml-0" }
                      name={ "device-desktop-16" }
                    />
                  </div>
                  <div className={ "w-full bg-container-secondary-bg pl-4 p-3 flex flex-col text-container-fg" }>
                    <span className={ "text-container-tertiary-fg font-semibold tracking-wide" }>
                      { session.ip }
                    </span>
                    Desktop
                  </div>
                </Card>
              )
            } )
          }
        </section>
      </main>
    </div>
  )
}

export default SetttingsPageSession
