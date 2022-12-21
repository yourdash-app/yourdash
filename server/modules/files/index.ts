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
    }
    );
    app.get(`${api.ModulePath(this)}/sidebar/categories`, (req, res) => {
      return res.json({
        error: true
      })
    }
    );
  },
  install() { },
  unload() { },
};

export default module;
