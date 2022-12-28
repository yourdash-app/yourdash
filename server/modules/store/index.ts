import path from "path";
import YourDashModule from "./../../module.js";
import fs from "fs"
import includedApps from "../../includedApps.js"
import { log, resizeBase64Image } from "../../libServer.js";
import InstalledApplicationList from "../../../types/store/applicationList.js";

let module: YourDashModule = {
  name: "store",
  load(app, api) {
    app.get(`${api.ModulePath(this)}/included/apps`, (req, res) => {
      let output = includedApps.map((app) => {

        // @ts-ignore
        delete app.icon.launcher

        // @ts-ignore
        delete app.icon.quickShortcut

        return resizeBase64Image(96, 96, app.icon).then((image) => {
          app.icon = image
          return app
        })
      })
      Promise.all(output)
        .then((resp) => {
          res.json(resp)
        })
    })

    app.get(`${api.ModulePath(this)}/application/:applicationId`, (req, res) => {
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
            let json = defaultApps
            let result = includedApps.find((obj) => obj.name === req.params.applicationId)
            if (!result) {
              log(`ERROR: no store product found named: ${req.params.applicationId}`)
              return res.json({
                error: true
              })
            }
            resizeBase64Image(352, 352, result.icon).then((icon) => {
              return res.json({
                ...result,
                installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined,
                icon: icon,
                uninstallable: (result?.name !== "dash") && (result?.name !== "store") && (result?.name !== "settings") && (result?.name !== "files")
              })
            })
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
        let result = includedApps.find((obj) => obj.name === req.params.applicationId)
        if (!result) {
          log(`ERROR: no store product found named: ${req.params.applicationId}`)
          return res.json({
            error: true
          })
        }
        resizeBase64Image(284, 284, result.icon).then((icon) => {
          return res.json({
            ...result,
            installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined,
            icon: icon,
            uninstallable: (result?.name !== "dash") && (result?.name !== "store") && (result?.name !== "settings") && (result?.name !== "files")
          })
        })
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
            if (err) {
              log(`ERROR: cannot write installed_apps.json`)
              return res.json({
                error: true
              });
            }
            res.json(defaultApps);
          }
        );
      } else {
        fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
          if (err) {
            log("ERROR: couldn't read installed_apps.json")
            return res.json({
              error: true
            })
          }
          let json = JSON.parse(data.toString()) as string[]
          var result = includedApps.filter((app) => json.includes(app.name)) || []
          return res.json(
            result.map((item) => {
              return {
                name: item.name,
                description: item.description,
                displayName: item.displayName,
                icon: {
                  store: item.icon
                },
                path: item.path
              } as InstalledApplicationList
            })
          )
        })
      }
    })

    app.post(`${api.ModulePath(this)}/application/:applicationId/install`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
        let defaultApps = [ "dash", "store", "settings", "files" ]

        let json = defaultApps as string[]
        json.push(req.params.applicationId)
        fs.writeFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), JSON.stringify(json), (err) => {
          if (err) {
            log(`ERROR: couldn't write installed_apps.json`)
            return res.json(
              {
                error: true
              }
            )
          }
          return res.json({
            installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined
          })
        })

        fs.writeFile(
          path.resolve(`${api.FsOrigin}/installed_apps.json`),
          JSON.stringify([
            ...defaultApps
          ]),
          (err) => {
            if (err) return res.json({
              error: true
            });
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
        json.push(req.params.applicationId)
        fs.writeFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), JSON.stringify(json), (err) => {
          if (err) {
            log(`ERROR: couldn't write installed_apps.json`)
            return res.json(
              {
                error: true
              }
            )
          }
          return res.json({
            installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined
          })
        })
      })
    })

    app.delete(`${api.ModulePath(this)}/application/:applicationId`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
        log(`ERROR: unable to uninstall an application which was not already installed`)
        return res.json({
          error: true
        })
      }
      fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
        if (err) {
          log("ERROR: couldn't read installed_apps.json")
          return res.json({
            error: true
          })
        }

        let json = JSON.parse(data.toString()) as string[]
        json = json.filter((app) => app !== req.params.applicationId)
        fs.writeFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), JSON.stringify(json), (err) => {
          if (err) {
            log(`ERROR: couldn't write installed_apps.json`)
            return res.json(
              {
                error: true
              }
            )
          }
          return res.json({
            installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined
          })
        })
      })
    })
  },
  install() { },
  unload() { },
};

export default module;
