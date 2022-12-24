/*
 *   Copyright (c) 2022 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import fs from 'fs';
import path from 'path';
import YourDashUser, { YourDashUserSettings } from '../lib/user.js';
import { encrypt, generateRandomStringOfLength } from './encryption.js';
import { ENV, RELEASE_CONFIGURATION, YourDashServerConfig } from './index.js';
import { log, returnBase64Image } from './libServer.js';

export default function main(cb: () => void) {
  checkEnvironmentVariables(
    () => checkYourDashConfigJson(
      () => checkIfAdministratorUserExists(
        () => checkConfigurationVersion(
          () => cb()
        )
      )
    )
  )
}

function checkEnvironmentVariables(cb: () => void) {
  if (!fs.existsSync(path.resolve(ENV.FsOrigin))) {
    fs.mkdir(ENV.FsOrigin, {
      recursive: true
    }, (err) => {
      if (err) {
        log(`(Start up) ERROR: the 'FsOrigin' environment variable is invalid`)
        return process.exit(1)
      }
      log(`(Start up) a folder has been created at the location of the 'FsOrigin' environment variable`)
      cb()
    })
  } else {
    cb()
  }
}

function checkYourDashConfigJson(cb: () => void) {
  if (!fs.existsSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`))) {
    fs.writeFile(
      path.resolve(`${ENV.FsOrigin}/yourdash.config.json`),
      JSON.stringify({
        activeModules: [ 'userManagement', 'core', 'files', 'store' ],
        defaultBackground: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../background.jpg`)),
        favicon: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
        instanceEncryptionKey: generateRandomStringOfLength(32),
        logo: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
        name: 'YourDash Instance',
        themeColor: '#a46',
        version: 1,
        loginPageConfig: {
          background: {
            src: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../background.jpg`)),
          },
          logo: {
            src: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
            position: {
              left: null,
              top: null,
              right: null,
              bottom: null,
            },
          },
          message: {
            content: 'Server not yet fully configured',
            position: {
              left: null,
              top: null,
              right: null,
              bottom: null,
            },
          },
        },
      } as YourDashServerConfig),
      (err) => {
        if (err) {
          log(`(Start up) ERROR: a yourdash.config.json file could not be created!`)
          process.exit(1)
        }
        log(`config file was created in the data origin directory.`);
        cb()
      }
    );
  } else {
    cb()
  }
}

// this should check for the version in the yourdash.config.json file
function checkConfigurationVersion(cb: () => void) {
  const SERVER_CONFIG: YourDashServerConfig = JSON.parse(
    fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString()
  );

  // check if the version of the configuration is the same as the current version which is running
  if (SERVER_CONFIG.version === RELEASE_CONFIGURATION.CURRENT_VERSION)
    return cb()

  // try to upgrade for each version
  // e.g: if the version is 1 upgrade it to 2 in the configuration
  //      and adapt the known properties
  switch (SERVER_CONFIG.version) {
    // eslint-disable-next-line no-fallthrough
    case 1:
      fs.readFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), (err, data) => {
        if (err) {
          log(`(Start up) [Configuration Updater] ERROR: unable to read yourdash.config.json`)
          return process.exit(1)
        }
        let jsonData: YourDashServerConfig = JSON.parse(data.toString())
        jsonData.version = 2
        fs.writeFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), JSON.stringify(jsonData), (err) => {
          if (err) {
            log(`(Start up) [Configuration Updater] ERROR: unable to write to yourdash.config.json`)
            return process.exit(1)
          }
          checkConfigurationVersion(cb)
        })
      })
    // eslint-disable-next-line no-fallthrough
    default:
      cb()
  }
}

function checkIfAdministratorUserExists(cb: () => void) {
  if (!fs.existsSync(path.resolve(`${ENV.FsOrigin}/data/users/admin/user.json`))) {
    fs.mkdir(path.resolve(`${ENV.FsOrigin}/data/users/admin/`), {
      recursive: true
    }, (err) => {
      if (err) {
        log(`${err}`);
        process.exit(1)
      }
      fs.writeFile(
        `${ENV.FsOrigin}/data/users/admin/user.json`,
        JSON.stringify({
          version: '1',
          name: {
            first: 'Admin',
            last: 'istrator'
          },
          userName: 'admin',
          profile: {
            banner: '',
            description: '',
            image: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../default_user_profile.png`)),
            location: {
              public: false,
              value: '',
            },
            status: {
              public: false, value: ''
            },
            externalLinks: {
            },
          },
        } as YourDashUser),
        (err) => {
          if (err) return log(`${err}`);
          const SERVER_CONFIG: YourDashServerConfig = JSON.parse(
            fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString()
          );
          fs.writeFile(
            path.resolve(`${ENV.FsOrigin}/data/users/admin/keys.json`),
            JSON.stringify({
              hashedKey: encrypt('admin', SERVER_CONFIG),
            }),
            (err) => {
              if (err) {
                log(
                  `(Start up) ERROR: could not encrypt (during administrator default credential generation): ${err}`
                );
                process.exit(1)
              }
              fs.writeFile(
                `${ENV.FsOrigin}/data/users/admin/config.json`,
                JSON.stringify({
                  panel: {
                    launcher: {
                      shortcuts: [
                        {
                          icon: returnBase64Image(
                            path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)
                          ),
                          name: 'Dashboard',
                          url: '/app/dash',
                        },
                      ],
                    },
                  },
                } as YourDashUserSettings),
                (err) => {
                  if (err) {
                    log(
                      `(Start up) ERROR: could not write configuration (during administrator default configuration generation): ${err}`
                    );
                    process.exit(1)
                  }
                  return cb()
                }
              );
            }
          );
        }
      );
    });
  } else {
    cb()
  }
}