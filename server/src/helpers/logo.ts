import sharp from "sharp"
import fs from "fs"
import path from "path"

export function generateLogos() {
  sharp( fs.readFileSync( path.resolve( process.cwd(), "./fs/instance_logo.avif" ) ) )
    .resize( 36, 36 )
    .toFile( path.resolve( process.cwd(), "./fs/logo_panel_small.avif" ) )
    .catch( err => console.error( err ) )
}

export function getInstanceLogoBase64(): string {
  return fs.readFileSync( path.resolve( process.cwd(), "./fs/instance_logo.avif" ) ).toString( "base64" )
}
