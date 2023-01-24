import fs from 'fs';
import path from 'path';
import { encrypt, generateRandomStringOfLength } from './encryption.js';
import { ENV, RELEASE_CONFIGURATION } from './index.js';
import { log, returnBase64Image } from './libServer.js';
import includedApps from './includedApps.js';
export default function main(cb) {
    checkEnvironmentVariables(() => checkYourDashConfigJson(() => checkIfAdministratorUserExists(() => checkConfigurationVersion(() => checkIfAllInstalledAppsStillExist(() => checkIfAllUsersHaveTheLatestConfig(() => cb()))))));
}
function checkIfAllUsersHaveTheLatestConfig(cb) {
    cb();
    fs.readdir(`${ENV.FsOrigin}/data/users/`, (err, users) => {
        if (err) {
            log(`(Start up) ERROR: unable to read '${ENV.FsOrigin}/data/users/'`);
            return process.exit(1);
        }
        users.forEach((user) => {
            fs.readFile(path.resolve(`${ENV.FsOrigin}/data/users/${user}/user.json`), (err, data) => {
                if (err) {
                    log(`(Start up): unable to read ${user}/user.json`);
                    return process.exit(1);
                }
                const json = JSON.parse(data.toString());
                if (!json.permissions) {
                    json.permissions = [];
                }
                if (!json.name.first) {
                    json.name.first = "Unknown";
                }
                if (!json.name.last) {
                    json.name.last = "user";
                }
                fs.writeFile(path.resolve(`${ENV.FsOrigin}/data/users/${user}/user.json`), JSON.stringify(json), (err) => {
                    if (err) {
                        log(`(Start up) ERROR: unable to write ${path.resolve(`${ENV.FsOrigin}/data/users/${user}/user.json`)}`);
                    }
                });
            });
        });
    });
}
function checkIfAllInstalledAppsStillExist(cb) {
    if (fs.existsSync(path.resolve(`${ENV.FsOrigin}/installed_apps.json`))) {
        fs.readFile(`${ENV.FsOrigin}/installed_apps.json`, (err, data) => {
            if (err) {
                log(`(Start up) CRITICAL ERROR: unable to read installed_apps.json`);
                return process.exit(1);
            }
            let json = JSON.parse(data.toString());
            json.forEach((app) => {
                if (includedApps.find((includedApplication) => includedApplication.name === app))
                    return;
                json = json.filter((application) => application !== app);
            });
            fs.writeFile(`${ENV.FsOrigin}/installed_apps.json`, JSON.stringify(json), (err) => {
                if (err) {
                    log(`(Start up) CRITICAL ERROR: unable to write to installed_apps.json`);
                    return process.exit(1);
                }
                cb();
            });
        });
    }
    else {
        cb();
    }
}
function checkEnvironmentVariables(cb) {
    if (!fs.existsSync(path.resolve(ENV.FsOrigin))) {
        fs.mkdir(ENV.FsOrigin, { recursive: true }, (err) => {
            if (err) {
                log(`(Start up) ERROR: the 'FsOrigin' environment variable is invalid`);
                return process.exit(1);
            }
            log(`(Start up) a folder has been created at the location of the 'FsOrigin' environment variable`);
            cb();
        });
    }
    else {
        cb();
    }
}
function checkYourDashConfigJson(cb) {
    if (!fs.existsSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`))) {
        fs.writeFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), JSON.stringify({
            activeModules: ['userManagement', 'core', 'files', 'store'],
            defaultBackground: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../background.jpg`)),
            favicon: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
            instanceEncryptionKey: generateRandomStringOfLength(32),
            loginPageConfig: {
                background: { src: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../background.jpg`)), },
                logo: {
                    position: {
                        bottom: null,
                        left: null,
                        right: null,
                        top: null,
                    },
                    src: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
                },
                message: {
                    content: 'This server is new. Welcome to YourDash!',
                    position: {
                        bottom: null,
                        left: null,
                        right: null,
                        top: null,
                    },
                },
            },
            logo: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
            name: 'YourDash Instance',
            themeColor: '#a46',
            version: 1,
        }), (err) => {
            if (err) {
                log(`(Start up) ERROR: a yourdash.config.json file could not be created!`);
                process.exit(1);
            }
            log(`config file was created in the data origin directory.`);
            cb();
        });
    }
    else {
        cb();
    }
}
function checkConfigurationVersion(cb) {
    const SERVER_CONFIG = JSON.parse(fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString());
    if (SERVER_CONFIG.version === RELEASE_CONFIGURATION.CURRENT_VERSION)
        return cb();
    switch (SERVER_CONFIG.version) {
        case 1:
            fs.readFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), (err, data) => {
                if (err) {
                    log(`(Start up) [Configuration Updater] ERROR: unable to read yourdash.config.json`);
                    return process.exit(1);
                }
                const jsonData = JSON.parse(data.toString());
                jsonData.version = 2;
                fs.writeFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), JSON.stringify(jsonData), (err) => {
                    if (err) {
                        log(`(Start up) [Configuration Updater] ERROR: unable to write to yourdash.config.json`);
                        return process.exit(1);
                    }
                    checkConfigurationVersion(cb);
                });
            });
        default:
            cb();
    }
}
function checkIfAdministratorUserExists(cb) {
    if (!fs.existsSync(path.resolve(`${ENV.FsOrigin}/data/users/admin/user.json`))) {
        fs.mkdir(path.resolve(`${ENV.FsOrigin}/data/users/admin/profile/`), { recursive: true }, (err) => {
            if (err) {
                log(`${err}`);
                process.exit(1);
            }
            fs.writeFileSync(`${ENV.FsOrigin}/data/users/admin/profile/picture.png`, fs.readFileSync(path.resolve(`${ENV.FsOrigin}/../default_user_profile.png`)));
            fs.writeFile(`${ENV.FsOrigin}/data/users/admin/user.json`, JSON.stringify({
                name: {
                    first: 'Admin',
                    last: 'istrator'
                },
                profile: {
                    banner: '',
                    description: '',
                    externalLinks: {},
                    image: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../default_user_profile.png`)),
                    location: {
                        public: false,
                        value: '',
                    },
                    status: {
                        public: false, value: ''
                    },
                },
                userName: 'admin',
                version: '1',
            }), (err) => {
                if (err)
                    return log(`${err}`);
                const SERVER_CONFIG = JSON.parse(fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString());
                fs.writeFile(path.resolve(`${ENV.FsOrigin}/data/users/admin/keys.json`), JSON.stringify({ hashedKey: encrypt('admin', SERVER_CONFIG), }), (err) => {
                    if (err) {
                        log(`(Start up) ERROR: could not encrypt (during administrator default credential generation): ${err}`);
                        process.exit(1);
                    }
                    fs.writeFile(`${ENV.FsOrigin}/data/users/admin/config.json`, JSON.stringify({ panel: { launcher: { shortcuts: [
                                    {
                                        icon: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
                                        name: 'Dashboard',
                                        url: '/app/dash',
                                    },
                                ], }, }, }), (err) => {
                        if (err) {
                            log(`(Start up) ERROR: could not write configuration (during administrator default configuration generation): ${err}`);
                            process.exit(1);
                        }
                        return cb();
                    });
                });
            });
        });
    }
    else {
        cb();
    }
}
