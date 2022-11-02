import Module from "../../module.js"
import Express from "express"

export default class YourDashModule implements Module {
  name = "userManagement"
  id = "test@ewsgit.github.io" as `${string}@${string}.${string}`
  constructor() {}

  load(app: Express.Application) {
    app.get("/api/user/create/:username", (req, res) => {
      res.send(`hello new user ${req.params.username}`)
    })
  }

  unload() {
  }

  install() {
  }
}
