import express from "express"
import cors from "cors"

console.log( `----------------------------------------------------\n                      YourDash                      \n----------------------------------------------------` )

export enum YourDashServerDiscoveryStatus {
  MAINTENANCE,
  NORMAL
}

const app = express()
app.use( express.json( { limit: "50mb" } ) )
app.use( cors() )

app.get( `/`, (req, res) => {
  return res.send( `Hello from the yourdash server software` )
} )

app.get( `/test`, (req, res) => {
  const discoveryStatus: YourDashServerDiscoveryStatus = YourDashServerDiscoveryStatus.NORMAL as YourDashServerDiscoveryStatus
  switch (discoveryStatus) {
    case YourDashServerDiscoveryStatus.MAINTENANCE:
      return res.json( { status: YourDashServerDiscoveryStatus.MAINTENANCE, type: "yourdash" } )
    case YourDashServerDiscoveryStatus.NORMAL:
      return res.json( { status: YourDashServerDiscoveryStatus.NORMAL, type: "yourdash" } )
    default:
      console.error( `discovery status returned an invalid value` )
      return res.json( { status: YourDashServerDiscoveryStatus.MAINTENANCE, type: "yourdash" } )
  }
} )

app.listen( 3560, () => {
  console.log( `server now listening on port 3560!` )
} )
