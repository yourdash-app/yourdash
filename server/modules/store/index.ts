import path from "path";
import YourDashModule from "./../../module.js";
import fs from "fs"
import includedApps from "./../../data/includedApps.js"
import { log } from "../../libServer.js";

let module: YourDashModule = {
  name: "store",
  load(app, api) {
    app.get(`${api.ModulePath(this)}/included/apps`, (req, res) => {
      return res.json(includedApps)
    })

    app.get(`${api.ModulePath(this)}/application/:applicationId`, (req, res) => {
      let response = includedApps.find((obj) => obj.name === req.params.applicationId)
      return res.json({
        ...response
      })
    })

    app.get(`${api.ModulePath(this)}/installed/apps`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
        let defaultApps = [ "dash", "store", "settings", "files" ]
        fs.writeFile(
          path.resolve(`${api.FsOrigin}/installed_apps.json`),
          JSON.stringify([
            ...defaultApps
          ]),
          (err) => {
            if (err) return res.json({
              error: true
            });
            return res.json([
              ...defaultApps
            ]);
          }
        );
      }
      fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
        if (err) {
          log("ERROR: couldn't read installed_apps.json")
          return res.json({
            error: true
          })
        }
        let json = JSON.parse(data.toString()) as string[]
        var result = includedApps.filter((app) => json.includes(app.name));
        return res.json(
          result
        )
      })
    })
  },
  install() { },
  unload() { },
};

export default module;
