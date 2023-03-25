import express from "express"

console.log(`----------------------------------------------------\n                      YourDash                      \n----------------------------------------------------`)

const app = express()
app.use(express.json({ limit: "50mb" }))

app.get(`/`, (req, res) => {
  return res.send(`Hello from yourdash server`)
})

app.listen(3560, () => {
  console.log(`server now listening on port 3560!`)
})
