import { Application as ExpressApplication } from "express"
import YourDashPanel from "../../helpers/panel.js"
import { YourDashApplicationServerPlugin } from "../../helpers/applications.js"

const main: YourDashApplicationServerPlugin = ( { app } ) => {
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
}

export default main
