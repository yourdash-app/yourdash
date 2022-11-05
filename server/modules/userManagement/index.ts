import Module from '../../module.js';
import Express from 'express';
import fs from 'fs';
import { ENV } from '../../index.js';
import YourDashUser from '../../../lib/user.js';

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
            fs.writeFile(`${ENV.FS_ORIGIN}/data/users/${username}/keys.json`, JSON.stringify({
              hashedPass: "11235"
            }), (err) => {
              if (err) return res.sendStatus(500);
              return res.send(`hello new user ${req.params.username}`);
            });
          }
        );
      });
    });
  }

  unload() {}

  install() {}
}
