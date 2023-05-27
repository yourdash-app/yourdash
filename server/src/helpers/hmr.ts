import chokidar from "chokidar"

export default function hmr( paths: string[], callback: ( event?: string ) => void ) {
  callback()

  chokidar.watch( paths )
    .on( "change", ( event, path ) => {
      callback( event )
    } )
}
