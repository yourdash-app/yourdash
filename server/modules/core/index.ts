import Module from "../../module.js"
import Express from "express"

export default class YourDashModule implements Module {
  name = "test module"
  id = "test@ewsgit.github.io" as `${string}@${string}.${string}`
  constructor() {}

  load(app: Express.Application) {
    app.get("/abc-xyz", (req, res) => {
      res.send(`hello from ${this.id}`)
    })
  }

  unload() {
  }

  install() {
  }
}
