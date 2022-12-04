import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { decrypt, encrypt, generateRandomStringOfLength } from '../../encryption.js';
import { ENV } from '../../index.js';
import YourDashModule from './../../module.js';
import YourDashUser, { YourDashUserSettings } from './../../../lib/user';
import { log } from './../../libServer.js';
import console from 'console';

let USER_CACHE: { [key: string]: string } = {};

const Module: YourDashModule = {
  name: 'userManagement',
  id: 'userManagement',

  load(app, _api) {
    app.use((req, res, next) => {
      if (req.path.startsWith('/test')) return next();
      if (req.path.startsWith('/api/get/server')) return next();
      if (req.path.startsWith('/api/user/login')) return next();
      if (req.headers.username) {
        let userName = req.headers.username as string;
        let sessionToken = req.headers.sessiontoken as string;
        if (USER_CACHE[userName]) {
          if (USER_CACHE[userName] === sessionToken) {
            next();
          } else {
            process.stdout.write(chalk.bgRed(' Unauthorized '));
            return res.json({ error: true });
          }
        } else {
          fs.readFile(
            path.resolve(`${ENV.FS_ORIGIN}/data/users/${userName}/keys.json`),
            (err, data) => {
              if (err) return res.json({ error: true });
              let sessionKey = JSON.parse(data.toString()).sessionToken;
              if (sessionKey === sessionToken) {
                USER_CACHE[userName] = sessionKey;
                next();
              }
            }
          );
        }
      } else {
        return res.json({ error: true });
      }
    });

    app.post('/api/user/create/:username', (req, res) => {
      let { username } = req.params;
      let password = req.headers.password as string;
      let { name } = req.headers;
      console.log(password);
      if (!password) return res.json({ error: true });
      if (fs.existsSync(path.resolve(`${ENV.FS_ORIGIN}/data/users/${username}`)))
        return res.sendStatus(403);
      fs.mkdir(`${ENV.FS_ORIGIN}/data/users/${username}/`, { recursive: true }, (err) => {
        if (err) return res.json({ error: true });
        fs.writeFile(
          `${ENV.FS_ORIGIN}/data/users/${username}/user.json`,
          JSON.stringify({
            name: {
              first: name,
              last: '',
            },
            userName: username,
            version: '1',
            profile: {
              banner: '',
              description: '',
              externalLinks: {
                custom: {
                  public: false,
                  value: '',
                },
                facebook: {
                  public: false,
                  value: '',
                },
                git: {
                  personal: {
                    public: false,
                    value: '',
                  },
                  org: [],
                },
                instagram: {
                  public: false,
                  value: '',
                },
                mastodon: {
                  public: false,
                  value: '',
                },
                tiktok: {
                  public: false,
                  value: '',
                },
                twitter: {
                  public: false,
                  value: '',
                },
                youtube: {
                  public: false,
                  value: '',
                },
              },
              image: '',
              location: {
                public: false,
                value: '',
              },
              status: {
                public: true,
                value: '',
              },
            },
          } as YourDashUser),
          (err) => {
            if (err) return res.sendStatus(500);
            fs.writeFile(
              `${ENV.FS_ORIGIN}/data/users/${username}/keys.json`,
              JSON.stringify({
                hashedKey: encrypt(password, _api.SERVER_CONFIG),
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
                              new Blob([
                                fs.readFileSync(path.resolve(`${ENV.FS_ORIGIN}./../yourdash.svg`)),
                              ])
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
      // let userName = req.headers.username as string;
      // let password = req.headers.password as string;
      // if (!userName || !password) return res.sendStatus(401);
      // fs.readFile(
      //   path.resolve(`${ENV.FS_ORIGIN}/data/users/${userName}/keys.json`),
      //   (err, data) => {
      //     if (err) return res.sendStatus(404);
      //     try {
      //       JSON.parse(data.toString());
      //     } catch (err) {
      //       console.log(data.toString());
      //       return log(`ERROR failed to parse keys.json for user: ${userName}, ${err}`);
      //     }
      //     let parsedKeysFile = JSON.parse(data.toString());
      //     if (password === decrypt(parsedKeysFile.hashedKey, _api.SERVER_CONFIG)) {
      //       // user is now authorized :D
      //       let sessionToken = generateRandomStringOfLength(256);
      //       fs.writeFile(
      //         path.resolve(`${ENV.FS_ORIGIN}/data/users/${userName}/keys.json`),
      //         JSON.stringify({ ...parsedKeysFile, sessionToken: sessionToken }),
      //         (err) => {
      //           if (err) {
      //             log(`ERROR: ${err}`);
      //             return res.sendStatus(404);
      //           }
      //           return res.send(sessionToken);
      //         }
      //       );
      //     } else {
      //       return res.sendStatus(403);
      //     }
      //   }
      // );
      let username = req.headers.username as string;
      let password = req.headers.password as string;
      // check that the username and password was supplied
      if (!(username && password)) {
        res.json({ error: `A username or password was not provided!` });
        return log(`ERROR a username or password was not provided in the headers for /user/login!`);
      }
      // check that the user actually exists
      if (!fs.existsSync(`${ENV.FS_ORIGIN}/data/users/${username}`)) {
        res.json({ error: `Unknown user` });
        return log(`ERROR unknown user: ${username}`);
      }
      // fetch the user's password from the fs
      fs.readFile(`${ENV.FS_ORIGIN}/data/users/${username}/keys.json`, (err, data) => {
        if (err) {
          res.json({ error: `An issue occured reading saved user data.` });
          return log(`ERROR an error occured reading ${username}'s keys.json`);
        }
        let keysJson = JSON.parse(data.toString());
        // check if the password is correct
        if (password === decrypt(keysJson.hashedKey, _api.SERVER_CONFIG)) {
          let newSessionToken = generateRandomStringOfLength(256);
          fs.writeFile(
            `${ENV.FS_ORIGIN}/data/users/${username}/keys.json`,
            JSON.stringify({
              hashedKey: keysJson.hashedKey,
              sessionToken: newSessionToken,
            }),
            (err) => {
              if (err) {
                res.json({ error: `There was an issue with starting a new session.` });
                return log(
                  `ERROR ${username}'s keys.json could not be overwritten during the login process!`
                );
              }
              res.json({
                sessionToken: newSessionToken,
                error: false,
              });
            }
          );
        }
      });
    });

    app.get('/api/get/current/user', (req, res) => {
      if (!fs.existsSync(`${ENV.FS_ORIGIN}/data/users/${req.header('username')}`)) {
        return res.json({ error: true });
      }
      fs.readFile(
        `${ENV.FS_ORIGIN}/data/users/${req.header('username')}/user.json`,
        (err, data) => {
          if (err) return res.json({ error: true });
          return res.send({ user: JSON.parse(data.toString()) });
        }
      );
    });

    app.get('/api/get/current/user/settings', (req, res) => {
      if (!fs.existsSync(`${ENV.FS_ORIGIN}/data/users/${req.header('username')}`)) {
        return res.sendStatus(403);
      }
      fs.readFile(
        `${ENV.FS_ORIGIN}/data/users/${req.header('username')}/config.json`,
        (err, data) => {
          if (err) return res.sendStatus(404);
          return res.send(data);
        }
      );
    });
  },

  unload() {},

  install() {},
};

export default Module;
