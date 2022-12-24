import path from "path";
import YourDashUser from "../../../lib/user.js";
import { log } from "../../libServer.js";
import YourDashModule from "../../module.js";
import fs from "fs"

let module: YourDashModule = {
  name: "files",
  load(app, api) {
    app.get(`${api.ModulePath(this)}/user/quota`, (req, res) => {
      if (!fs.existsSync(`${api.UserFs}/user.json`)) return res.send({
        error: true
      })
      fs.readFile(`${api.UserFs}/user.json`, (err, data) => {
        if (err) {
          log(`ERROR: unable to read file ${api.UserFs}/user.json`)
          return
        }
        let json = JSON.parse(data.toString()) as YourDashUser
        res.send({
          quota: json.quota
        })
      })
    });
    app.get(`${api.ModulePath(this)}/sidebar/categories`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/files/`))) {
        fs.mkdir(path.resolve(`${api.UserAppData(req)}/files/`), {
          recursive: true
        }, (err) => {
          if (err) {
            log(`ERROR: unable to make directory: ${api.UserAppData(req)}/files/`)
            return res.json({
              error: true
            })
          }
          res.json([])
        })
      }

      // todo: fetch categories from file and respond with them
      return res.json({
        error: true
      })
    });
    app.get(`${api.ModulePath(this)}/sidebar/set/default`, (req, res) => {

    })
  },
  install() { },
  unload() { },
};

export default module;
