/*
 *   Copyright (c) 2022-2023 Ewsgit
 *   https://ewsgit.mit-license.org
 */

import fs from "fs";
import path from "path";
import { type YourDashUser, type YourDashUserSettings } from "types/core/user.js";
import { encrypt, generateRandomStringOfLength } from "./encryption.js";
import { ENV, RELEASE_CONFIGURATION, type YourDashServerConfig } from "./index.js";
import { log, returnBase64Image } from "./libServer.js";
import includedApps, { DEFAULT_APPS } from "./includedApps.js";

export default async function main(cb: () => void) {
    await checkEnvironmentVariables();
    await checkYourDashConfigJson();
    await checkIfAdministratorUserExists();
    await checkConfigurationVersion();
    await checkIfAllInstalledAppsStillExist();
    await checkIfAllUsersHaveTheLatestConfig();

    cb();
}

async function checkIfAllUsersHaveTheLatestConfig() {
    return;

    // fs.readdir(`${ENV.FsOrigin}/data/users/`, (err, users) => {
    //   if (err) {
    //     log(`(Start up) ERROR: unable to read '${ENV.FsOrigin}/data/users/'`)
    //     return process.exit(1)
    //   }
    //
    //   users.forEach(user => {
    //     fs.readFile(path.resolve(`${ENV.FsOrigin}/data/users/${user}/user.json`), (err, data) => {
    //       if (err) {
    //         log(`(Start up): unable to read ${user}/user.json`)
    //         return process.exit(1)
    //       }
    //
    //       const json = JSON.parse(data.toString()) as YourDashUser
    //
    //       if (!json.permissions) {
    //         json.permissions = []
    //       }
    //
    //       if (!json.name.first) {
    //         json.name.first = "Unknown"
    //       }
    //
    //       if (!json.name.last) {
    //         json.name.last = "user"
    //       }
    //
    //       fs.writeFile(path.resolve(`${ENV.FsOrigin}/data/users/${user}/user.json`), JSON.stringify(json), err => {
    //         if (err) {
    //           log(`(Start up) ERROR: unable to write ${path.resolve(`${ENV.FsOrigin}/data/users/${user}/user.json`)}`)
    //         }
    //       })
    //     })
    //   })
    // })
}

async function checkIfAllInstalledAppsStillExist() {
    if (fs.existsSync(path.resolve(`${ENV.FsOrigin}/installed_apps.json`))) {
        fs.readFile(`${ENV.FsOrigin}/installed_apps.json`, (err, data) => {
            if (err) {
                log(`(Start up) CRITICAL ERROR: unable to read installed_apps.json`);
                return process.exit(1);
            }
            1;

            let json = [] as string[];

            try {
                json = JSON.parse(data.toString()) as string[];
            } catch (e) {
                json = DEFAULT_APPS;
            }

            json.forEach((app) => {
                if (
                    includedApps.find((includedApplication) => {
                        return includedApplication.name === app;
                    })
                )
                    return;

                json = json.filter((application) => {
                    return application !== app;
                });
            });

            fs.writeFile(`${ENV.FsOrigin}/installed_apps.json`, JSON.stringify(json), (err) => {
                if (err) {
                    log(`(Start up) CRITICAL ERROR: unable to write to installed_apps.json`);
                    return process.exit(1);
                }
                return;
            });
        });
    } else {
        return;
    }
}

async function checkEnvironmentVariables() {
    if (!fs.existsSync(path.resolve(ENV.FsOrigin))) {
        try {
            await fs.mkdirSync(ENV.FsOrigin, { recursive: true });
        } catch (err) {
            log(`(Start up) ERROR: unable to create default ./fs/`);
            process.exit(1);
        }
    } else {
        return;
    }
}

async function checkYourDashConfigJson() {
    if (!fs.existsSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`))) {
        try {
            fs.writeFileSync(
                path.resolve(`${ENV.FsOrigin}/yourdash.config.json`),
                JSON.stringify({
                    activeModules: ["userManagement", "core", "files", "store"],
                    defaultBackground: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../background.jpg`)),
                    favicon: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
                    instanceEncryptionKey: generateRandomStringOfLength(32),
                    loginPageConfig: {
                        background: {
                            src: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../background.jpg`)),
                        },
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
                            content: "This server is new. Welcome to YourDash!",
                            position: {
                                bottom: null,
                                left: null,
                                right: null,
                                top: null,
                            },
                        },
                    },
                    logo: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../yourdash256.png`)),
                    name: "YourDash Instance",
                    themeColor: "#a46",
                    version: 1,
                } as YourDashServerConfig)
            );
        } catch (err) {
            log(`(Start up) ERROR: a yourdash.config.json file could not be created! ${err}`);
            return process.exit(1);
        }
    } else {
        return;
    }
}

// this should check for the version in the yourdash.config.json file
async function checkConfigurationVersion() {
    const SERVER_CONFIG: YourDashServerConfig = await JSON.parse(
        fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString()
    );

    // check if the version of the configuration is the same as the current version which is running
    if (SERVER_CONFIG.version === RELEASE_CONFIGURATION.CURRENT_VERSION) return;

    // try to upgrade for each version
    // e.g: if the version is 1 upgrade it to 2 in the configuration
    //      and adapt the known properties
    switch (SERVER_CONFIG.version) {
        // eslint-disable-next-line no-fallthrough
        case 1:
            fs.readFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), (err, data) => {
                if (err) {
                    log(`(Start up) [Configuration Updater] ERROR: unable to read yourdash.config.json`);
                    return process.exit(1);
                }
                const jsonData: YourDashServerConfig = JSON.parse(data.toString());
                jsonData.version = 2;
                fs.writeFile(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`), JSON.stringify(jsonData), (err) => {
                    if (err) {
                        log(`(Start up) [Configuration Updater] ERROR: unable to write to yourdash.config.json`);
                        return process.exit(1);
                    }
                    return checkConfigurationVersion();
                });
            });
        // eslint-disable-next-line no-fallthrough
        default:
            return;
    }
}

async function checkIfAdministratorUserExists() {
    if (!fs.existsSync(path.resolve(`${ENV.FsOrigin}/data/users/admin/user.json`))) {
        fs.mkdir(path.resolve(`${ENV.FsOrigin}/data/users/admin/profile/`), { recursive: true }, (err) => {
            if (err) {
                log(`${err}`);
                process.exit(1);
            }
            fs.writeFileSync(
                `${ENV.FsOrigin}/data/users/admin/profile/picture.png`,
                fs.readFileSync(path.resolve(`${ENV.FsOrigin}/../default_user_profile.png`))
            );
            fs.writeFile(
                `${ENV.FsOrigin}/data/users/admin/user.json`,
                JSON.stringify({
                    name: {
                        first: "Admin",
                        last: "istrator",
                    },
                    profile: {
                        banner: "",
                        description: "",
                        externalLinks: {},
                        image: returnBase64Image(path.resolve(`${ENV.FsOrigin}/../default_user_profile.png`)),
                        location: {
                            public: false,
                            value: "",
                        },
                        status: {
                            public: false,
                            value: "",
                        },
                    },
                    userName: "admin",
                    version: "1",
                } as YourDashUser),
                (err) => {
                    if (err) return log(`${err}`);
                    const SERVER_CONFIG: YourDashServerConfig = JSON.parse(
                        fs.readFileSync(path.resolve(`${ENV.FsOrigin}/yourdash.config.json`)).toString()
                    );
                    fs.writeFile(
                        path.resolve(`${ENV.FsOrigin}/data/users/admin/keys.json`),
                        JSON.stringify({ hashedKey: encrypt("admin", SERVER_CONFIG) }),
                        (err) => {
                            if (err) {
                                log(
                                    `(Start up) ERROR: could not encrypt (during administrator default credential generation): ${err}`
                                );
                                process.exit(1);
                            }
                            fs.writeFile(
                                `${ENV.FsOrigin}/data/users/admin/config.json`,
                                JSON.stringify({
                                    panel: {
                                        launcher: {
                                            shortcuts: [
                                                {
                                                    name: "Dashboard",
                                                    url: "/app/dash",
                                                },
                                                {
                                                    name: "Store",
                                                    url: "/app/store",
                                                },
                                                {
                                                    name: "Settings",
                                                    url: "/app/settings",
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
                                        process.exit(1);
                                    }
                                    return;
                                }
                            );
                        }
                    );
                }
            );
        });
    } else {
        return;
    }
}
