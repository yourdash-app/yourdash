import chokidar from "chokidar"

export default function hmr( paths: string[], callback: () => void ) {
  callback()

  chokidar.watch( paths )
    .on( "change", ( event, path ) => {
      console.log( `[HMR]: ${event} changed` )
      callback()
    } )
}
