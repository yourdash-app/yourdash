import { Application as ExpressApplication } from "express"
import YourDashPanel from "../../helpers/panel.js"
import { YourDashApplicationServerPlugin } from "../../helpers/applications.js"
import YourDashUnreadUser from "../../helpers/user.js"
import { PersonalServerAcceleratorCommunication } from "../../helpers/personalServerAccelerator.js"

const main: YourDashApplicationServerPlugin = ( { app, io } ) => {
  app.post( "/app/settings/panel/position", ( req, res ) => {
    const { username } = req.headers as { username: string }
    const { position } = req.body

    const panel = new YourDashPanel( username )

    panel.setPanelPosition( position )

    return res.json( { success: true } )
  } )

  app.post( "/app/settings/panel/launcher", ( req, res ) => {
    const { username } = req.headers as { username: string }
    const { launcher } = req.body

    const panel = new YourDashPanel( username )

    panel.setLauncherType( launcher )

    return res.json( { success: true } )
  } )

  app.get( "/app/settings/debug/psa/update/:sessionId", async ( req, res ) => {
    const { sessionId } = req.params
    const { username } = req.headers as { username: string }
    const user = await ( new YourDashUnreadUser( username ).read() )

    const psa = new PersonalServerAcceleratorCommunication( username, user.getSession( parseInt( sessionId, 10 ) ) )

    if ( !psa.socketConnection ) {
      return res.json( { success: false } )
    }

    psa.emit( "/core/update", true )

    return res.json( { success: true, data: user.getSession( parseInt( sessionId, 10 ) ) } )
  } )
}

export default main
