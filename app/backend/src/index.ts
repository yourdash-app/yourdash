import cors from "cors"
import express from "express"

const app = express()

app.use( cors() )

app.get( `/test`, (_req, res) => {
  return res.send( `YourDash instance` )
} )

app.listen( 3560, () => {
  console.log( `Yourdash backend listening on port 3560` )
} )
