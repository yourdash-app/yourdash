import { promises as fs } from "fs";
import path from "path";
import YourDashUnreadUser from "../../helpers/user.js";
import { type YourDashApplicationServerPlugin } from "../../helpers/applications.js";
import authenticatedImage, { authenticatedImageType } from "../../core/authenticatedImage.js";
import sharp from "sharp";
import getFileType, { FileTypes } from "../../../../shared/core/fileType.js";

const main: YourDashApplicationServerPlugin = ( { app } ) => {
  app.post( "/app/files/get", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    if ( !req.body.path ) {
      return res.json( { files: [] } );
    }
    
    const user = new YourDashUnreadUser( username );
    
    let files: any[] = [];
    
    try {
      files = await fs.readdir( path.join( user.getPath(), req.body.path ) );
    } catch ( _err ) {
      files = [];
    }
    
    Promise.all(
      files.map( async file => {
        try {
          const type = (
            await fs.lstat( path.join( user.getPath(), req.body.path, file ) )
          ).isFile()
            ? "file"
            : "directory";
          const name = path.basename( path.join( user.getPath(), req.body.path, file ) );
          
          return {
            type,
            name
          };
        } catch ( _err ) {
          return false;
        }
      } )
    ).then( files => {
      return res.json( {
        files: files.filter( file => !!file )
      } );
    } );
  } );
  
  app.post( "/app/files/get/thumbnails-small", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    if ( !req.body.path ) {
      return res.json( { files: [] } );
    }
    
    const user = new YourDashUnreadUser( username );
    
    let files: any[] = [];
    
    console.log( `PATH: ${ path.join( user.getPath(), req.body.path ) }` );
    console.log( `USER PATH: ${ path.resolve( user.getPath() ) }` );
    
    try {
      files = await fs.readdir( path.join( user.getPath(), req.body.path ) );
    } catch ( _err ) {
      files = [];
    }
    
    return res.json( {
      files: ( await Promise.all(
        files.map( async file => {
          try {
            const type = ( await fs.lstat( path.join( user.getPath(), req.body.path, file ) ) ).isFile()
              ? "file"
              : "directory";
            
            const name = path.basename( path.join( user.getPath(), req.body.path, file ) );
            
            const extension = path.extname( path.join( user.getPath(), req.body.path, file ) );
            
            let icon = "";
            
            switch ( extension ) {
              case ".png":
              case ".jpg":
              case ".jpeg":
              case ".webp":
              case ".avif":
              case ".svg":
              case ".gif":
                // check if the file size is more than 1mb
                if ( ( await fs.stat( path.join( user.getPath(), req.body.path, file ) ) ).size > 1024 * 1024 ) {
                  icon = "";
                } else {
                  // use sharp to downscale the image to 128x128
                  const image = sharp( path.join( user.getPath(), req.body.path, file ) ).resize( 96, 96 );
                  
                  icon = authenticatedImage( username, authenticatedImageType.base64, ( await image.toBuffer() ).toString( "base64" ) );
                }
                break;
              default:
                break;
            }
            
            return {
              type,
              name,
              icon
            };
          } catch ( _err ) {
            return false;
          }
        } )
      ) ).filter( file => !!file )
    } );
  } );
  
  app.post( "/app/files/get/file", async ( req, res ) => {
    const { username } = req.headers as {
      username: string
    };
    
    if ( !req.body.path ) {
      return res.send( "[YOURDASH] Error: Unknown file" );
    }
    
    const user = new YourDashUnreadUser( username );
    
    const filePath = path.join( user.getPath(), req.body.path );
    
    try {
      switch ( getFileType( filePath ) ) {
        case FileTypes.PlainText:
          return res.send( ( await fs.readFile( filePath ) ).toString() );
        case FileTypes.Image:
          return res.send( authenticatedImage( username, authenticatedImageType.file, filePath ) );
        default:
          return res.send( "[YOURDASH] Error: Unsupported file type" );
      }
      
    } catch ( _err ) {
      return res.send( "[YOURDASH] Error: Unable to read file" );
    }
  } );
};

export default main;
