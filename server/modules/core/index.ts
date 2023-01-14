import fs from 'fs';
import path from 'path';
import { generateRandomStringOfLength } from '../../encryption.js';
import { base64FromBufferImage, bufferFromBase64Image, log, resizeBase64Image, returnBase64Image } from '../../libServer.js';
import YourDashModule from './../../module.js';
import quickShortcut from "./../../../types/core/panel/quickShortcut.js"
import includedApps from '../../includedApps.js';
import LauncherApplication from "./../../../types/core/panel/launcherApplication.js"
import YourDashUser from '../../../types/core/user.js';
import sharp from 'sharp';

const Module: YourDashModule = {
  install() {
    log("Core module installed")
  },

  load(request, api) {

    // #region /app panel

    request.get(`/panel/background-image`, (req, res) => {
      if (!fs.existsSync(`${api.UserAppData(req)}/${this.name}/background.json`)) {
        const defaultImage = returnBase64Image(`${api.FsOrigin}/../background.jpg`)

        fs.writeFile(
          `${api.UserAppData(req)}/${this.name}/background.json`,
          JSON.stringify({ image: defaultImage }),
          (err) => {
            if (err) {
              return res.json({ error: true })
            }

            return res.json({ image: defaultImage })
          })
        return
      }

      fs.readFile(`${api.UserAppData(req)}/${this.name}/background.json`, (err, data) => {
        if (err) {
          return res.json({ error: true })
        }

        let json = JSON.parse(data.toString())

        res.json(json)
      })
    })

    request.get(`/panel/quick-shortcuts/`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/`))) {
        return res.json([]);
      }
      fs.readFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
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
      if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`))) {

        // create the directory
        fs.mkdir(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/`, { recursive: true }, (err) => {
          if (err) {
            log(`[${this.name}] ERROR: ${err}`)
            return process.exit(1)
          }

          // write a blank array to the shortcuts.json file
          fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), "[]", (err) => {
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

            resizeBase64Image(32, 32, includedApplication?.icon || returnBase64Image(path.resolve(`${api.FsOrigin}/../yourdash256.png`)))
              .then((image) => {
                json.push({
                  icon: image,
                  id: id,
                  name: req.body.name || "undefined",
                  url: req.body.url || '/app/dash'
                })
                fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
                  if (err) {
                    log(`ERROR ${err}`)
                    return res.json({ error: true })
                  }
                  return res.json(json.filter((shortcut) => shortcut.id === id))
                })
              })
          })
        })
      } else {
        fs.readFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
          if (err) {
            data = Buffer.from("[]")
          }
          const json = JSON.parse(data.toString()) as quickShortcut[]
          const id = generateRandomStringOfLength(32)
          const includedApplication = includedApps.find((app) => app.name === req.body.name)

          if (!includedApplication) return log(`Can't create quick shortcut for unknown application: ${req.body.name}`)

          resizeBase64Image(32, 32, includedApplication?.icon || returnBase64Image(path.resolve(`${api.FsOrigin}/../yourdash256.png`)))
            .then((image) => {
              json.push({
                icon: image,
                id: id,
                name: req.body.name || "undefined",
                url: req.body.url || '/app/dash'
              })
              fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
                if (err) {
                  log(`ERROR ${err}`)
                  return res.json({ error: true })
                }
                res.json(json.filter((shortcut) => shortcut.id === id))
              })
            })
        })
      }
    })

    request.post(`/panel/quick-shortcut/:id`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`)))
        return res.json({ error: true })

      fs.readFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
        if (err) {
          log(`[${this.name}] ERROR: ${err}`)
          return res.json({ error: true })
        }

        const json = JSON.parse(data.toString()) as quickShortcut[]
        const shortcut = json.find((shortcut) => shortcut.id === req.params.id)

        if (shortcut === undefined) return res.json({ error: true })

        const shortcutInd = json.indexOf(shortcut)

        if (req.body.name)
          json[ shortcutInd ].name = req.body.name
        if (req.body.icon)
          json[ shortcutInd ].icon = req.body.icon
        if (req.body.url)
          json[ shortcutInd ].url = req.body.url

        fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
          if (err) {
            log(`[${this.name}] ERROR: ${err}`)
            return res.json({ error: true })
          }
        })

        return res.json(json)
      })
    });

    request.delete(`/panel/quick-shortcut/:id`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`)))
        return res.json({ error: true })

      fs.readFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
        if (err) {
          log(`[${this.name}] ERROR: ${err}`)
          return res.json({ error: true })
        }

        let json = JSON.parse(data.toString()) as quickShortcut[]

        json = json.filter((shortcut) => shortcut.id !== req.params.id)

        fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
          if (err) {
            log(`[${this.name}] ERROR: ${err}`)
            return res.json({ error: true })
          }
        })

        return res.json(json)
      })
    });

    request.get(`/panel/launcher/apps`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
        const defaultApps = [ "dash", "store", "settings", "files" ]
        fs.writeFile(
          path.resolve(`${api.FsOrigin}/installed_apps.json`),
          JSON.stringify([
            ...defaultApps
          ]),
          (err) => {
            if (err) {
              log(`ERROR: cannot write installed_apps.json`)
              return res.json({ error: true });
            }
            res.json(defaultApps);
          }
        );
      } else {
        fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
          if (err) {
            log("ERROR: couldn't read installed_apps.json")
            return res.json({ error: true })
          }
          const json = JSON.parse(data.toString()) as string[]
          const result = includedApps.filter((app) => json.includes(app.name)) || []

          const promises = result.map((item) => {
            return resizeBase64Image(128, 128, item.icon)
              .then((image) => {
                return {
                  displayName: item.displayName,
                  icon: image,
                  name: item.name,
                  path: item.path,
                } as LauncherApplication
              })
          })
          Promise.all(promises).then((resp) => {
            res.json(resp)
          })
        })
      }
    })

    request.get(`/panel/user/profile/picture`, (req, res) => {
      fs.readFile(`${api.UserFs(req)}/user.json`, (err, data) => {
        if (err) {
          log(`ERROR: unable to read user.json`)
          return res.json({ error: true })
        }
        const json: YourDashUser = JSON.parse(data.toString())
        const originalProfileImage = json.profile.image
        const resizedImage = sharp(bufferFromBase64Image(originalProfileImage))
        resizedImage.resize(64, 64).toBuffer((err, buf) => {
          if (err) {
            console.log(err)
            log(`ERROR: unable to resize image`)
            return res.json({ error: true })
          }
          return res.json({ image: base64FromBufferImage(buf) })
        })
      })
    })

    // #endregion

    // #region settings

    request.get(`/settings/user/profile/image`, (req, res) => {
      fs.readFile(`${api.UserFs(req)}/user.json`, (err, data) => {
        if (err) {
          log(`ERROR: unable to read user.json`)
          return res.json({ error: true })
        }
        const json: YourDashUser = JSON.parse(data.toString())
        const originalProfileImage = json.profile.image
        const resizedImage = sharp(bufferFromBase64Image(originalProfileImage))
        resizedImage.resize(256, 256).toBuffer((err, buf) => {
          if (err) {
            console.log(err)
            log(`ERROR: unable to resize image`)
            return res.json({ error: true })
          }
          return res.json({ image: base64FromBufferImage(buf) })
        })
      })
    })

    request.get(`/settings/user/profile`, (req, res) => {
      fs.readFile(`${api.UserFs(req)}/user.json`, (err, data) => {
        if (err) {
          log(`ERROR: unable to read user.json`)
          return res.json({ error: true })
        }
        const json: YourDashUser = JSON.parse(data.toString())


        return res.json({
          name: json.name,
          profile: {
            description: json.profile.description,
            externalLinks: json.profile.externalLinks,
            location: json.profile.location,
            status: json.profile.status
          },
          userName: json.userName
        })
      })
    })

    request.post(`/settings/user/profile`, (req, res) => {

      const { firstName, lastName, userName, description } = req.body

      console.log(req.body)

      if (!firstName)
        return res.json({ error: "no firstName supplied" })
      if (!lastName)
        return res.json({ error: "no lastName supplied" })
      if (!userName)
        return res.json({ error: "no userName supplied" })
      if (!description)
        return res.json({ error: "no description supplied" })

      fs.readFile(`${api.UserFs(req)}/user.json`, (err, data) => {
        if (err) {
          log(`ERROR: unable to read user.json`)
          return res.json({ error: true })
        }
        let json: YourDashUser = JSON.parse(data.toString())

        json.name.first = firstName
        json.name.last = lastName
        json.userName = userName
        json.profile.description = description

        fs.writeFile(`${api.UserFs(req)}/user.json`, JSON.stringify(json), (err) => {
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
      if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
        fs.writeFile(
          path.resolve(`${api.FsOrigin}/installed_apps.json`),
          JSON.stringify({ apps: [] }),
          (err) => {
            if (err) return res.json({ error: true });
            return res.json({ apps: [] });
          }
        );
      }

      fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
        if (err)
          return res.json({ error: true });
        const json = JSON.parse(data.toString()) || [];
        return res.json(json);
      })
    })

    request.get(`/instance/config`, (_req, res) => {
      return res.json({
        ...api.SERVER_CONFIG,
        instanceEncryptionKey: "REDACTED"
      })
    })

    request.get(`/instance/login/background`, (_req, res) => {
      return res.json({ image: api.SERVER_CONFIG.loginPageConfig.background || "" })
    })

    request.get(`/instance/login/name`, (req, res) => {
      return res.json({ name: api.SERVER_CONFIG.name })
    })

    request.get(`/instance/login/logo`, (_req, res) => {
      return res.json({ image: api.SERVER_CONFIG.loginPageConfig.logo || "" })
    })

    request.get(`/instance/login/message`, (_req, res) => {
      return res.json({ text: api.SERVER_CONFIG.loginPageConfig.message.content || "" })
    })


    request.get(`/instance/default/background`, (_req, res) => {
      return res.json({ image: api.SERVER_CONFIG.defaultBackground })
    })

    request.get(`/instance/favicon`, (_req, res) => {
      return res.send(api.SERVER_CONFIG.favicon)
    })

    request.get(`/instance/logo`, (_req, res) => {
      return res.json({ image: api.SERVER_CONFIG.logo })
    })

    request.get(`/instance/version`, (_req, res) => {
      return res.json({ version: api.SERVER_CONFIG.version })
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
