import fs from 'fs';
import path from 'path';
import YourDashModule from './../../module.js';

const Module: YourDashModule = {
  name: 'core',
  id: 'core',

  load(app, api) {
    // #region /app panel

    app.get(`/api/${this.name}/panel/quick-shortcut/list`, (req, res) => {
      return res.json({ error: true });
    });

    app.post(`/api/${this.name}/panel/quick-shortcut/:id`, (req, res) => {
      return res.json({ error: true });
    });

    app.delete(`/api/${this.name}/panel/quick-shortcut/:id`, (req, res) => {
      return res.json({ error: true });
    });

    // #endregion

    // #region /app panel

    app.get(`/api/${this.name}/instance/installed/apps`, (req, res) => {
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
        if (err) return res.json({ error: true });
        try {
          let json = JSON.parse(data.toString());
          return res.json(json);
        } catch (err) {
          return res.json({ error: true });
        }
      });
    });

    // #endregion
  },

  unload() {},

  install() {},
};

export default Module;
