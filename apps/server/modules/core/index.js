import fs from 'fs';
import path from 'path';
import { generateRandomStringOfLength } from '../../encryption.js';
import { log, resizeImage, returnBase64Image } from '../../libServer.js';
import includedApps from '../../includedApps.js';
const Module = {
    load(request, moduleApi) {
        request.get(`/panel/background-image`, (req, res) => {
            const defaultImage = returnBase64Image(`${moduleApi.FsOrigin}/../background.jpg`);
            return res.json({ image: defaultImage });
        });
        request.get(`/panel/quick-shortcuts/`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/`))) {
                return res.json([]);
            }
            fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
                if (err) {
                    log(`[core] ERROR: ${err}`);
                    return res.json({ error: true });
                }
                const json = JSON.parse(data.toString());
                return res.json(json);
            });
        });
        request.post(`/panel/quick-shortcut/create`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`))) {
                fs.mkdir(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/`, { recursive: true }, err => {
                    if (err) {
                        log(`[core] ERROR: ${err}`);
                        return process.exit(1);
                    }
                    fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`), "[]", err => {
                        if (err) {
                            log(`[core] ERROR: ${err}`);
                            return process.exit(1);
                        }
                        const json = [];
                        const id = generateRandomStringOfLength(32);
                        const includedApplication = includedApps.find(app => {
                            return app.name === req.body.name;
                        });
                        if (!includedApplication) {
                            log(`Can't create quick shortcut for unknown application: ${req.body.name}`);
                            return res.json({ error: true });
                        }
                        resizeImage(48, 48, path.resolve(`${moduleApi.FsOrigin}/../assets/apps/${includedApplication.icon}`), image => {
                            json.push({
                                icon: image, id, name: req.body.name || "undefined", url: req.body.url || '/app/dash'
                            });
                            fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), err => {
                                if (err) {
                                    log(`ERROR ${err}`);
                                    return res.json({ error: true });
                                }
                                return res.json(json.filter(shortcut => {
                                    return shortcut.id === id;
                                }));
                            });
                        }, () => {
                            return res.json({ error: true });
                        });
                    });
                });
            }
            else {
                fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
                    if (err) {
                        data = Buffer.from("[]");
                    }
                    const json = JSON.parse(data.toString());
                    const id = generateRandomStringOfLength(32);
                    const includedApplication = includedApps.find(app => {
                        return app.name === req.body.name;
                    });
                    if (!includedApplication)
                        return log(`Can't create quick shortcut for unknown application: ${req.body.name}`);
                    resizeImage(32, 32, path.resolve(`${moduleApi.FsOrigin}/../assets/apps/${includedApplication.icon}`), image => {
                        json.push({
                            icon: image, id, name: req.body.name || "undefined", url: req.body.url || '/app/'
                        });
                        fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), err => {
                            if (err) {
                                log(`ERROR ${err}`);
                                return res.json({ error: true });
                            }
                            return res.json(json.filter(shortcut => {
                                return shortcut.id === id;
                            }));
                        });
                    }, () => {
                        return res.json({ error: true });
                    });
                });
            }
        });
        request.post(`/panel/quick-shortcut/:id`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`)))
                return res.json({ error: true });
            fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
                if (err) {
                    log(`[core] ERROR: ${err}`);
                    return res.json({ error: true });
                }
                const json = JSON.parse(data.toString());
                const shortcut = json.find(shortcut => {
                    return shortcut.id === req.params.id;
                });
                if (shortcut === undefined)
                    return res.json({ error: true });
                const shortcutInd = json.indexOf(shortcut);
                if (req.body.name)
                    json[shortcutInd].name = req.body.name;
                if (req.body.icon)
                    json[shortcutInd].icon = req.body.icon;
                if (req.body.url)
                    json[shortcutInd].url = req.body.url;
                fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), err => {
                    if (err) {
                        log(`[core] ERROR: ${err}`);
                        return res.json({ error: true });
                    }
                });
                return res.json(json);
            });
        });
        request.delete(`/panel/quick-shortcut/:id`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`)))
                return res.json({ error: true });
            fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
                if (err) {
                    log(`[core] ERROR: ${err}`);
                    return res.json({ error: true });
                }
                let json = JSON.parse(data.toString());
                json = json.filter(shortcut => {
                    return shortcut.id !== req.params.id;
                });
                fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/core/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), err => {
                    if (err) {
                        log(`[core] ERROR: ${err}`);
                        return res.json({ error: true });
                    }
                });
                return res.json(json);
            });
        });
        request.get(`/panel/launcher/apps`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`))) {
                const defaultApps = ["dash", "store", "settings", "files"];
                fs.writeFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), JSON.stringify([...defaultApps]), err => {
                    if (err) {
                        log(`ERROR: cannot write installed_apps.json`);
                        return res.json({ error: true });
                    }
                    res.json(defaultApps);
                });
            }
            else {
                fs.readFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), (err, data) => {
                    if (err) {
                        log("ERROR: couldn't read installed_apps.json");
                        return res.json({ error: true });
                    }
                    const json = JSON.parse(data.toString());
                    const result = includedApps.filter(app => {
                        return json.includes(app.name);
                    }) || [];
                    Promise.all(result.map(item => {
                        return new Promise((response, reject) => {
                            resizeImage(164, 164, `${moduleApi.FsOrigin}/../assets/apps/${item.icon}`, image => {
                                response({
                                    displayName: item.displayName,
                                    icon: image,
                                    name: item.name,
                                    path: item.path,
                                    description: item.description,
                                    underDevelopment: item.underDevelopment || false
                                });
                            }, () => {
                                reject();
                            });
                        });
                    }))
                        .then(resp => {
                        return res.json(resp);
                    })
                        .catch(() => {
                        res.json({ error: true });
                    });
                });
            }
        });
        request.get(`/panel/user/profile/picture`, (req, res) => {
            resizeImage(64, 64, path.resolve(`${moduleApi.UserFs(req)}/profile/picture.png`), image => {
                res.json({ image });
            }, () => {
                res.json({ error: true });
            });
        });
        request.get(`/settings/user/profile/image`, (req, res) => {
            resizeImage(256, 256, path.resolve(`${moduleApi.UserFs(req)}/profile/picture.png`), image => {
                res.json({ image });
            }, () => {
                res.json({ error: true });
            });
        });
        request.get(`/settings/user/profile`, (req, res) => {
            fs.readFile(`${moduleApi.UserFs(req)}/user.json`, (err, data) => {
                if (err) {
                    log(`ERROR: unable to read user.json`);
                    return res.json({ error: true });
                }
                const json = JSON.parse(data.toString());
                return res.json({
                    name: json.name,
                    profile: {
                        description: json.profile.description,
                        externalLinks: json.profile.externalLinks,
                        location: json.profile.location,
                        status: json.profile.status
                    },
                    userName: json.userName
                });
            });
        });
        request.post(`/settings/user/profile`, (req, res) => {
            const { firstName, lastName, userName, description } = req.body;
            console.log(req.body);
            if (!firstName)
                return res.json({ error: "no firstName supplied" });
            if (!lastName)
                return res.json({ error: "no lastName supplied" });
            if (!userName)
                return res.json({ error: "no userName supplied" });
            if (!description)
                return res.json({ error: "no description supplied" });
            fs.readFile(`${moduleApi.UserFs(req)}/user.json`, (err, data) => {
                if (err) {
                    log(`ERROR: unable to read user.json`);
                    return res.json({ error: true });
                }
                const json = JSON.parse(data.toString());
                json.name.first = firstName;
                json.name.last = lastName;
                json.userName = userName;
                json.profile.description = description;
                fs.writeFile(`${moduleApi.UserFs(req)}/user.json`, JSON.stringify(json), err => {
                    if (err) {
                        log(`(core) ERROR: unable to write to user.json`);
                        return res.json({ error: true });
                    }
                    res.json({ success: true });
                });
            });
        });
        request.get(`/instance/installed/apps`, (_req, res) => {
            if (!fs.existsSync(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`))) {
                console.log("WARNING: core instance installed apps HERE");
                fs.writeFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), JSON.stringify({ apps: [] }), err => {
                    if (err)
                        return res.json({ error: true });
                    return res.json({ apps: [] });
                });
            }
            fs.readFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), (err, data) => {
                if (err)
                    return res.json({ error: true });
                const json = JSON.parse(data.toString()) || [];
                return res.json(json);
            });
        });
        request.get(`/instance/config`, (_req, res) => {
            return res.json({
                ...moduleApi.SERVER_CONFIG, instanceEncryptionKey: "REDACTED"
            });
        });
        request.get(`/instance/login/background`, (_req, res) => {
            const img = Buffer.from(moduleApi.SERVER_CONFIG.loginPageConfig.background.src.split(",")[1], 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            res.end(img);
        });
        request.get(`/instance/login/name`, (req, res) => {
            return res.json({ name: moduleApi.SERVER_CONFIG.name });
        });
        request.get(`/instance/login/logo`, (_req, res) => {
            return res.json({ image: moduleApi.SERVER_CONFIG.loginPageConfig.logo || "" });
        });
        request.get(`/instance/login/message`, (_req, res) => {
            return res.json({ text: moduleApi.SERVER_CONFIG.loginPageConfig.message.content || "" });
        });
        request.get(`/instance/default/background`, (_req, res) => {
            return res.json({ image: moduleApi.SERVER_CONFIG.defaultBackground });
        });
        request.get(`/instance/favicon`, (_req, res) => {
            return res.send(moduleApi.SERVER_CONFIG.favicon);
        });
        request.get(`/instance/logo`, (_req, res) => {
            return res.json({ image: moduleApi.SERVER_CONFIG.logo });
        });
        request.get(`/instance/version`, (_req, res) => {
            return res.json({ version: moduleApi.SERVER_CONFIG.version });
        });
        request.post(`/test/echo`, (req, res) => {
            res.json(req.body);
        });
        request.get('/', (req, res) => {
            res.redirect(`https://yourdash.vercel.app/login/server/${req.url}`);
        });
    },
    unload: () => {
        log("WARNING: if the server hasn't been requested to shutdown a fatal problem has occurred! ( the core module has been unloaded so expect core features to break )");
    },
    install: () => {
        return 0;
    },
    requiredModules: [],
    configuration: {},
    uninstall: () => {
        return 0;
    }
};
export default Module;
