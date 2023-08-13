import { type YourDashApplicationServerPlugin } from "../../helpers/applications.js"

const main: YourDashApplicationServerPlugin = ( { app, io } ) => {
  app.get( "/app/endpoints/endpoints", ( req, res ) => res.json( app._router.stack )
  )
}


export default main
