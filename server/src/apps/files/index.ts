import { promises as fs } from "fs"
import path from "path"
import YourDashUnreadUser from "../../helpers/user.js"
import { type YourDashApplicationServerPlugin } from "../../helpers/applications.js"

const main: YourDashApplicationServerPlugin = app => {
  app.post( "/app/files/get", async ( req, res ) => {
    const { username } = req.headers as { username: string }

    if ( !req.body.path ) {
      return res.json( { files: [] } )
    }

    const user = new YourDashUnreadUser( username )

    let files = []

    try {
      files = await fs.readdir( path.resolve( user.getPath(), req.body.path ) )
    } catch ( _err ) {
      files = []
    }

    Promise.all( files.map( async file => {
      try {
        const type = (
          await fs.lstat( path.resolve( user.getPath(), req.body.path, file ) )
        ).isFile()
          ? "file"
          : "directory"
        const name = path.basename( path.resolve( user.getPath(), req.body.path, file ) )

        return { type, name }
      } catch ( _err ) {
        return false
      }
    } ) ).then( files => res.json( { files: files.filter( file => !!file ) } ) )
  } )
}

export default main
