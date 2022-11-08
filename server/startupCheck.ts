import fs from 'fs';
import YourDashUser from '../lib/user.js';
import { ENV } from './index.js';
import { log } from './libServer.js';

export default function main() {
  /*
    config file
    users
    groups
    admin user exists
  */
  if (!fs.readFileSync(`${ENV.FS_ORIGIN}/yourdash.config.json`))
    fs.writeFile(`${ENV.FS_ORIGIN}/yourdash.config.json`, '{}', () => {
      log(`config file was created in the data origin directory.`);
    });
  if (!fs.readFileSync(`${ENV.FS_ORIGIN}/data/users/admin/user.json`)) {
    fs.mkdir(`${ENV.FS_ORIGIN}/data/users/admin/`, { recursive: true }, (err) => {
          if (err) return log(`${err}`);
          fs.writeFile(
            `${ENV.FS_ORIGIN}/data/users/admin/user.json`,
            JSON.stringify({
              name: 'Administrator',
              userName: 'admin',
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
              if (err) return log(`${err}`);
              fs.writeFile(
                `${ENV.FS_ORIGIN}/data/users/admin/keys.json`,
                JSON.stringify({
                  hashedPass: '11235',
                }),
                (err) => {
                  if (err) return log(`${err}`);
                }
              );
            }
          );
    });
  }
}
