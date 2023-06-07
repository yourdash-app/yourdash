import React, { useState } from "react"
import { IYourDashSession, YourDashSessionType } from "shared/core/session"
import { Button } from "../../../../../../ui"
import csi from "helpers/csi"

const SettingsPersonalServerAcceleratorSection: React.FC = () => {
  const [sessions, setSessions] = useState<IYourDashSession<YourDashSessionType.desktop>[]>( [] )
  const [selectedSession, setSelectedSession] = useState<IYourDashSession<YourDashSessionType.desktop> | null>( null )
  return (
    <div>
      <h2>Personal Server Accelerator DEBUGGER</h2>
      <main>
        <Button onClick={ () => {
          csi.getJson( "/app/settings/debug/psa/update/5", data => {
            return 0
          } )
        } }
        >Trigger update</Button>
      </main>
    </div>
  )
}

export default SettingsPersonalServerAcceleratorSection
