import fs from 'fs';
import path from 'path';
import { generateRandomStringOfLength } from '../../encryption.js';
import { log, resizeImage, returnBase64Image } from '../../libServer.js';
import YourDashModule from './../../module.js';
import quickShortcut from "./../../../types/core/panel/quickShortcut.js"
import includedApps from '../../includedApps.js';
import LauncherApplication from "./../../../types/core/panel/launcherApplication.js"
import YourDashUser from '../../../types/core/user.js';

const Module: YourDashModule = {
  install() {
    log("Core module installed")
  },

  load(request, moduleApi) {

    // #region /app panel

    request.get(`/panel/background-image`, (req, res) => {
      const defaultImage = returnBase64Image(`${moduleApi.FsOrigin}/../background.jpg`)
      return res.json({ image: defaultImage })
    })

    request.get(`/panel/quick-shortcuts/`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/`))) {
        return res.json([]);
      }
      fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
        if (err) {
          log(`[${this.name}] ERROR: ${err}`)
          return res.json({ error: true });
        }

        const json = JSON.parse(data.toString()) as quickShortcut[]
        return res.json(json)
      })
    });

    request.post(`/panel/quick-shortcut/create`, (req, res) => {

      // check if the quick-shortcuts directory doesn't exist
      if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`))) {

        // create the directory
        fs.mkdir(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/`, { recursive: true }, (err) => {
          if (err) {
            log(`[${this.name}] ERROR: ${err}`)
            return process.exit(1)
          }

          // write a blank array to the shortcuts.json file
          fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), "[]", (err) => {
            if (err) {
              log(`[${this.name}] ERROR: ${err}`)
              return process.exit(1)
            }

            // set json to a blank array as we already know the contents of the shortcuts file
            const json = [] as quickShortcut[]

            // generate an id for referencing this shortcut
            const id = generateRandomStringOfLength(32)

            // find the referenced application in the included applications list
            const includedApplication = includedApps.find((app) => app.name === req.body.name)

            // if the application doesn't exist return
            if (!includedApplication) {
              log(`Can't create quick shortcut for unknown application: ${req.body.name}`)
              return res.json({ error: true })
            }

            resizeImage(48, 48, path.resolve(`${moduleApi.FsOrigin}/../assets/apps/${includedApplication.icon}`), (image) => {
              json.push({
                icon: image, id: id, name: req.body.name || "undefined", url: req.body.url || '/app/dash'
              })

              fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
                if (err) {
                  log(`ERROR ${err}`)
                  return res.json({ error: true })
                }
                return res.json(json.filter((shortcut) => shortcut.id === id))
              })
            }, () => {
              return res.json({ error: true })
            })
          })
        })
      } else {
        fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
          if (err) {
            data = Buffer.from("[]")
          }
          const json = JSON.parse(data.toString()) as quickShortcut[]
          const id = generateRandomStringOfLength(32)
          const includedApplication = includedApps.find((app) => app.name === req.body.name)

          if (!includedApplication) return log(`Can't create quick shortcut for unknown application: ${req.body.name}`)

          resizeImage(32, 32, path.resolve(`${moduleApi.FsOrigin}/../assets/apps/${includedApplication.icon}`), (image) => {
            json.push({
              icon: image, id: id, name: req.body.name || "undefined", url: req.body.url || '/app/'
            })

            fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
              if (err) {
                log(`ERROR ${err}`)
                return res.json({ error: true })
              }

              return res.json(json.filter((shortcut) => shortcut.id === id))
            })
          },
          () => {
            return res.json({ error: true })
          })
        })
      }
    })

    request.post(`/panel/quick-shortcut/:id`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`))) return res.json({ error: true })

      fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
        if (err) {
          log(`[${this.name}] ERROR: ${err}`)
          return res.json({ error: true })
        }

        const json = JSON.parse(data.toString()) as quickShortcut[]
        const shortcut = json.find((shortcut) => shortcut.id === req.params.id)

        if (shortcut === undefined) return res.json({ error: true })

        const shortcutInd = json.indexOf(shortcut)

        if (req.body.name) json[shortcutInd].name = req.body.name
        if (req.body.icon) json[shortcutInd].icon = req.body.icon
        if (req.body.url) json[shortcutInd].url = req.body.url

        fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
          if (err) {
            log(`[${this.name}] ERROR: ${err}`)
            return res.json({ error: true })
          }
        })

        return res.json(json)
      })
    });

    request.delete(`/panel/quick-shortcut/:id`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`))) return res.json({ error: true })

      fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
        if (err) {
          log(`[${this.name}] ERROR: ${err}`)
          return res.json({ error: true })
        }

        let json = JSON.parse(data.toString()) as quickShortcut[]

        json = json.filter((shortcut) => shortcut.id !== req.params.id)

        fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
          if (err) {
            log(`[${this.name}] ERROR: ${err}`)
            return res.json({ error: true })
          }
        })

        return res.json(json)
      })
    });

    request.get(`/panel/launcher/apps`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`))) {
        const defaultApps = [ "dash", "store", "settings", "files" ]
        fs.writeFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), JSON.stringify([ ...defaultApps ]), (err) => {
          if (err) {
            log(`ERROR: cannot write installed_apps.json`)
            return res.json({ error: true });
          }
          res.json(defaultApps);
        });
      } else {
        fs.readFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), (err, data) => {
          if (err) {
            log("ERROR: couldn't read installed_apps.json")
            return res.json({ error: true })
          }
          const json = JSON.parse(data.toString()) as string[]
          const result = includedApps.filter((app) => json.includes(app.name)) || []

          const response: LauncherApplication[] = []

          result.map((item) => {
            return resizeImage(128, 128, `${moduleApi.FsOrigin}/../assets/apps/${item.icon}`, (image) => {
              response.push({
                displayName: item.displayName,
                icon: image,
                name: item.name,
                path: item.path,
              } as LauncherApplication)

              if (response.length === result.length) {
                return res.json(response)
              }
            }, () => {
              return res.json({ error: true })
            })
          })
        })
      }
    })

    request.get(`/panel/user/profile/picture`, (req, res) => {
      resizeImage(64, 64, path.resolve(`${moduleApi.UserFs(req)}/profile/picture.png`), (image) => {
        return res.json({ image: image })
      }, () => {
        return res.json({ error: true })
      })
    })

    // #endregion

    // #region settings

    request.get(`/settings/user/profile/image`, (req, res) => {
      resizeImage(256, 256, path.resolve(`${moduleApi.UserFs(req)}/profile/picture.png`), (image) => {
        return res.json({ image: image })
      }, () => {
        return res.json({ error: true })
      })
    })

    request.get(`/settings/user/profile`, (req, res) => {
      fs.readFile(`${moduleApi.UserFs(req)}/user.json`, (err, data) => {
        if (err) {
          log(`ERROR: unable to read user.json`)
          return res.json({ error: true })
        }
        const json: YourDashUser = JSON.parse(data.toString())


        return res.json({
          name: json.name, profile: {
            description: json.profile.description,
            externalLinks: json.profile.externalLinks,
            location: json.profile.location,
            status: json.profile.status
          }, userName: json.userName
        })
      })
    })

    request.post(`/settings/user/profile`, (req, res) => {

      const {
        firstName, lastName, userName, description
      } = req.body

      console.log(req.body)

      if (!firstName) return res.json({ error: "no firstName supplied" })
      if (!lastName) return res.json({ error: "no lastName supplied" })
      if (!userName) return res.json({ error: "no userName supplied" })
      if (!description) return res.json({ error: "no description supplied" })

      fs.readFile(`${moduleApi.UserFs(req)}/user.json`, (err, data) => {
        if (err) {
          log(`ERROR: unable to read user.json`)
          return res.json({ error: true })
        }
        const json: YourDashUser = JSON.parse(data.toString())

        json.name.first = firstName
        json.name.last = lastName
        json.userName = userName
        json.profile.description = description

        fs.writeFile(`${moduleApi.UserFs(req)}/user.json`, JSON.stringify(json), (err) => {
          if (err) {
            log(`(${this.name}) ERROR: unable to write to user.json`)
            return res.json({ error: true })
          }

          res.json({ success: true })
        })
      })
    })

    // #endregion

    // #region general

    request.get(`/instance/installed/apps`, (_req, res) => {
      if (!fs.existsSync(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`))) {
        fs.writeFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), JSON.stringify({ apps: [] }), (err) => {
          if (err) return res.json({ error: true });
          return res.json({ apps: [] });
        });
      }

      fs.readFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), (err, data) => {
        if (err) return res.json({ error: true });
        const json = JSON.parse(data.toString()) || [];
        return res.json(json);
      })
    })

    request.get(`/instance/config`, (_req, res) => {
      return res.json({
        ...moduleApi.SERVER_CONFIG, instanceEncryptionKey: "REDACTED"
      })
    })

    request.get(`/instance/login/background`, (_req, res) => {
      return res.json({ image: moduleApi.SERVER_CONFIG.loginPageConfig.background || "" })
    })

    request.get(`/instance/login/name`, (req, res) => {
      return res.json({ name: moduleApi.SERVER_CONFIG.name })
    })

    request.get(`/instance/login/logo`, (_req, res) => {
      return res.json({ image: moduleApi.SERVER_CONFIG.loginPageConfig.logo || "" })
    })

    request.get(`/instance/login/message`, (_req, res) => {
      return res.json({ text: moduleApi.SERVER_CONFIG.loginPageConfig.message.content || "" })
    })


    request.get(`/instance/default/background`, (_req, res) => {
      return res.json({ image: moduleApi.SERVER_CONFIG.defaultBackground })
    })

    request.get(`/instance/favicon`, (_req, res) => {
      return res.send(moduleApi.SERVER_CONFIG.favicon)
    })

    request.get(`/instance/logo`, (_req, res) => {
      return res.json({ image: moduleApi.SERVER_CONFIG.logo })
    })

    request.get(`/instance/version`, (_req, res) => {
      return res.json({ version: moduleApi.SERVER_CONFIG.version })
    })

    request.post(`/test/echo`, (req, res) => {
      res.json(req.body)
    })

    request.get('/', (req, res) => {
      res.redirect(`https://yourdash.vercel.app/login/server/${req.url}`);
    });

    // #endregion
  },

  name: 'core',

  unload() {
    log("WARNING: if the server hasn't been requested to shutdown a fatal problem has occurred! (the core module has been unloaded so expect core features to break)")
  },

};

export default Module;
