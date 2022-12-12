import fs from 'fs';
import path from 'path';
import { log } from '../../libServer.js';
import YourDashModule from './../../module.js';

const Module: YourDashModule = {
  name: 'core',
  id: 'core',

  load(app, api) {

    // #region /app panel

    app.get(`/api/${this.name}/panel/quick-shortcut/list`, (_req, res) => {
      return res.json({
        error: true 
      });
    });

    app.post(`/api/${this.name}/panel/quick-shortcut/:id`, (_req, res) => {
      return res.json({
        error: true 
      });
    });

    app.delete(`/api/${this.name}/panel/quick-shortcut/:id`, (_req, res) => {
      return res.json({
        error: true 
      });
    });

    // #endregion

    // #region general

    app.get(`/api/${this.name}/instance/installed/apps`, (_req, res) => {
      if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
        fs.writeFile(
          path.resolve(`${api.FsOrigin}/installed_apps.json`),
          JSON.stringify({
            apps: [] 
          }),
          (err) => {
            if (err) return res.json({
              error: true 
            });
            return res.json({
              apps: [] 
            });
          }
        );
      }

      fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
        if (err) return res.json({
          error: true 
        });
        try {
          let json = JSON.parse(data.toString());
          return res.json(json);
        } catch (err) {
          return res.json({
            error: true 
          });
        }
      });
    });

    app.get(`/api/${this.name}/instance/config`, (_req, res) => { 
      return res.json({
        ...api.SERVER_CONFIG,
        instanceEncryptionKey: "REDACTED"
      })
    })

    app.get(`/api/${this.name}/instance/login/background`, (_req, res) => {
      return res.send(api.SERVER_CONFIG.loginPageConfig.background)
    })

    app.get(`/api/${this.name}/instance/default/background`, (_req, res) => {
      return res.json({
        image: api.SERVER_CONFIG.defaultBackground
      })
    })

    app.get(`/api/${this.name}/instance/favicon`, (_req, res) => {
      return res.send(api.SERVER_CONFIG.favicon)
    })

    app.get(`/api/${this.name}/instance/logo`, (_req, res) => {
      return res.json({
        image: api.SERVER_CONFIG.logo
      })
    })

    app.get(`/api/${this.name}/instance/version`, (_req, res) => {
      return res.json({
        version: api.SERVER_CONFIG.version
      })
    })

    // this is used during the login page to check if the provided url is a yourdash instance
    app.get('/test', (_req, res) => {
      res.send('yourdash instance');
    });

    app.get('/', (req, res) => {
      res.redirect(`https://yourdash.vercel.app/login/server/${req.url}`);
    });

    // #endregion
  },

  unload() {
    log("WARNING: if the server hasn't been requested to shutdown a fatal problem has occurred! (the core module has been unloaded so expect core features to break)")
  },

  install() {},
};

export default Module;
