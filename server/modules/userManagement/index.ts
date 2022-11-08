import Module from '../../module.js';
import Express from 'express';
import fs from 'fs';
import { ENV } from '../../index.js';
import YourDashUser, { YourDashUserSettings } from '../../../lib/user.js';

export default class YourDashModule implements Module {
  name = 'userManagement';
  id = 'test@ewsgit.github.io' as `${string}@${string}.${string}`;

  load(app: Express.Application) {
    app.post('/api/user/create/:username', (req, res) => {
      let { username } = req.params;
      fs.mkdir(`${ENV.FS_ORIGIN}/data/users/${username}/`, { recursive: true }, (err) => {
        if (err) return res.sendStatus(500);
        fs.writeFile(
          `${ENV.FS_ORIGIN}/data/users/${username}/user.json`,
          JSON.stringify({
            name: 'name',
            userName: 'username',
            profile: {
              banner: '',
              description: '',
              externalLinks: {
                git: '',
                twitter: '',
                youtube: '',
              },
            },
          } as YourDashUser),
          (err) => {
            if (err) return res.sendStatus(500);
            fs.writeFile(
              `${ENV.FS_ORIGIN}/data/users/${username}/keys.json`,
              JSON.stringify({
                hashedKey: '2193890134',
                currentKey: '',
              }),
              (err) => {
                if (err) return res.sendStatus(500);
                fs.writeFile(
                  `${ENV.FS_ORIGIN}/data/users/${username}/config.json`,
                  JSON.stringify({
                    panel: {
                      launcher: {
                        shortcuts: [
                          {
                            icon: URL.createObjectURL(
                              new Blob([fs.readFileSync(`${ENV.FS_ORIGIN}/yourdash.svg`)])
                            ),
                          },
                        ],
                      },
                    },
                  } as YourDashUserSettings),
                  (err) => {
                    if (err) return res.sendStatus(500);
                    return res.send(`hello new user ${req.params.username}`);
                  }
                );
              }
            );
          }
        );
      });
    });

    app.get('/api/user/login', (req, res) => {
      let { userName, userToken } = req.headers;
      if (!userName || !userToken) return res.send(401);
      fs.readFile(`${ENV.FS_ORIGIN}/data/users/${userName}/keys.json`, (err, data) => {
        if (err) return res.sendStatus(404);
        let correctUserToken = JSON.parse(data.toString());
        if (userToken !== correctUserToken) return res.sendStatus(403);
        return res.send;
      });
    });

    app.get('/api/get/current/user', (req, res) => {
      fs.readFile(
        `${ENV.FS_ORIGIN}/data/users/${req.header('userName')}/user.json`,
        (err, data) => {
          if (err) return res.sendStatus(404)
          return res.send(data)
        }
      );
    });
  }

  unload() {}

  install() {}
}
