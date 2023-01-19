import path from "path";
import YourDashModule from "./../../module.js";
import fs from "fs"
import includedApps, { DEFAULT_APPS } from "../../includedApps.js"
import { log, resizeImage } from "../../libServer.js";
import InstalledApplicationList from "../../../types/store/applicationList.js";
import { YourDashServerConfig } from "../../index.js";
import YourDashUser, { YourDashUserPermissions } from "./../../../types/core/user.js"

const module: YourDashModule = {
  install() {
    log(`Store module was installed`)
  },
  load(request, api) {
    if (!fs.existsSync(`${api.FsOrigin}/installed_apps.json`)) {
      fs.writeFile(`${api.FsOrigin}/installed_apps.json`, JSON.stringify(DEFAULT_APPS), (err) => {
        if (err) {
          log(`(${this.name}) ERROR: unable to write required file installed_apps.json`)
          return process.exit(1)
        }
      })
    }

    request.get(`/included/apps`, (_req, res) => {
      const output = includedApps.map((app) => {
        resizeImage(96, 96, app.icon, (err, image) => {
          if (err) {
            return res.json({ error: true })
          }

          app.icon = image;
          return app;
        });
      })
      Promise.all(output)
        .then((resp) => {
          res.json(resp)
        })
    })

    request.get(`/application/:applicationId`, (req, res) => {
      fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
        if (err) {
          log("ERROR: couldn't read installed_apps.json")
          return res.json({ error: true })
        }

        const json = JSON.parse(data.toString()) as string[]
        const result = includedApps.find((obj) => obj.name === req.params.applicationId)

        if (!result) {
          log(`ERROR: no store product found named: ${req.params.applicationId}`)
          return res.json({ error: true })
        }

        resizeImage(284, 284, result.icon, (err, image) => {
          if (err) {
            return res.json({ error: true })
          }

          return res.json({
            ...result,
            icon: image,
            installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined,
            uninstallable: (result?.name !== "dash") && (result?.name !== "store") && (result?.name !== "settings") && (result?.name !== "files")
          })
        })
      })
    })

    request.get(`/installed/apps`, (req, res) => {
      fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
        if (err) {
          log("ERROR: couldn't read installed_apps.json")
          return res.json({ error: true })
        }
        const json = JSON.parse(data.toString()) as string[]
        const result = includedApps.filter((app) => json.includes(app.name)) || []
        return res.json(
          result.map((item) => {
            return {
              description: item.description,
              displayName: item.displayName,
              icon: { store: item.icon },
              name: item.name,
              path: item.path
            } as InstalledApplicationList
          })
        )
      })
    })

    request.post(`/application/:applicationId/install`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
        const json = DEFAULT_APPS as string[]
        json.push(req.params.applicationId)
        fs.writeFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), JSON.stringify(json), (err) => {
          if (err) {
            log(`ERROR: couldn't write installed_apps.json`)
            return res.json({ error: true })
          }
          return res.json({ installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined })
        })

        fs.writeFile(
          path.resolve(`${api.FsOrigin}/installed_apps.json`),
          JSON.stringify([
            ...DEFAULT_APPS
          ]),
          (err) => {
            if (err) return res.json({ error: true });
          }
        );
      }
      fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
        if (err) {
          log("ERROR: couldn't read installed_apps.json")
          return res.json({ error: true })
        }

        const json = JSON.parse(data.toString()) as string[]
        json.push(req.params.applicationId)

        fs.readFile(path.resolve(`${api.FsOrigin}/yourdash.config.json`), (err, data) => {
          if (err) {
            log(`(Store) ERROR: unable to read yourdash.config.json`)
            return res.json({ error: true })
          }

          const json = JSON.parse(data.toString()) as YourDashServerConfig
          const application = includedApps.find((application) => application.name === req.params.applicationId)

          if (!application) {
            log(`(Store) ERROR: unknown application ${req.params.applicationId}`)
            return res.json({ error: true })
          }

          application.moduleRequirements.forEach((moduleRequirement) => {
            json.activeModules.push(moduleRequirement)
          })

          fs.writeFile(path.resolve(`${api.FsOrigin}/yourdash.config.json`), JSON.stringify(json), (err) => {
            if (err) {
              log(`(Store) ERROR: unable to`)
            }
          })
        })

        fs.writeFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), JSON.stringify(json), (err) => {
          if (err) {
            log(`ERROR: couldn't write installed_apps.json`)
            return res.json({ error: true })
          }
          return res.json({ installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined })
        })
      })
    })

    request.delete(`/application/:applicationId`, (req, res) => {
      fs.readFile(path.resolve(`${api.UserFs(req)}/user.json`), (err, data) => {
        if (err) {
          log(`(${this.name}) ERROR: unable to read ${req.headers.username}'s user.json`)
          return res.json({ error: true })
        }

        const user = JSON.parse(data.toString()) as YourDashUser

        if (user.permissions.indexOf(YourDashUserPermissions.RemoveApplications) === -1 && user.permissions.indexOf(YourDashUserPermissions.Administrator) === -1) {
          log(`user "${req.headers.username}" has tried to uninstall application ${req.params.applicationId} but failed due to not having the RemoveApplications permission`)
          return res.json({ installed: true })
        }

        fs.readFile(`${api.FsOrigin}/installed_apps.json`, (err, data) => {
          if (err) {
            log(`(${this.name}) ERROR: unable to read installed_apps.json`)
            return res.json({ error: true })
          }

          let json = JSON.parse(data.toString()) as string[]

          const application = includedApps.find((application) => application.name === req.params.applicationId)

          if (!application) {
            log(`(${this.name}) ERROR: no application with the name ${req.params.applicationId} exists`)
            return res.json({ error: true })
          }

          json = json.filter((app) => app !== req.params.applicationId)

          fs.writeFile(`${api.FsOrigin}/installed_apps.json`, JSON.stringify(json), (err) => {
            if (err) {
              log(`(${this.name}) ERROR: unable to write installed_apps.json`)
              return res.json({ error: true })
            }

            res.json({ installed: false })
          })
        })
      })
    })
  },
  name: "store",
  unload() {
    log(`Store module unloaded`)
  },
};

export default module;