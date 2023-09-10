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

import { promises as fs } from "fs";
import path from "path";
import YourDashUnreadUser from "backend/src/core/user/user.js";
import { type YourDashApplicationServerPlugin } from "backend/src/helpers/applications.js";
import authenticatedImage, { AUTHENTICATED_IMAGE_TYPE } from "backend/src/core/authenticatedImage.js";
import sharp from "sharp";
import getFileType, { FileTypes } from "shared/core/fileType.js";

const main: YourDashApplicationServerPlugin = ( { exp } ) => {
  exp.post( "/app/files/get", async ( req, res ) => {
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
  
  exp.post( "/app/files/get/thumbnails-small", async ( req, res ) => {
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
                // downscale the image
                const image = sharp( path.join( user.getPath(), req.body.path, file ) ).resize( 96, 96 );
                
                icon = authenticatedImage( username, AUTHENTICATED_IMAGE_TYPE.BASE64, ( await image.toBuffer() ).toString( "base64" ) );
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
  
  exp.post( "/app/files/get/file", async ( req, res ) => {
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
        return res.send( authenticatedImage( username, AUTHENTICATED_IMAGE_TYPE.FILE, filePath ) );
      default:
        return res.send( "[YOURDASH] Error: Unsupported file type" );
      }
      
    } catch ( _err ) {
      return res.send( "[YOURDASH] Error: Unable to read file" );
    }
  } );
};

export default main;
