import fs from 'fs';
import path from 'path';
import { generateRandomStringOfLength } from '../../encryption.js';
import { log, returnBase64Image } from '../../libServer.js';
const Module = {
    name: 'core',
    load(app, api) {
        app.get(`${api.ModulePath(this)}/panel/quick-shortcuts/`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/`))) {
                return res.json([]);
            }
            fs.readFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
                if (err) {
                    log(`[${this.name}] ERROR: ${err}`);
                    return res.json({
                        error: true
                    });
                }
                let json = JSON.parse(data.toString());
                return res.json(json);
            });
        });
        app.post(`${api.ModulePath(this)}/panel/quick-shortcut/create`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`))) {
                fs.mkdir(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/`, {
                    recursive: true
                }, (err) => {
                    if (err) {
                        log(`[${this.name}] ERROR: ${err}`);
                        return process.exit(1);
                    }
                    fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), "[]", (err) => {
                        if (err) {
                            log(`[${this.name}] ERROR: ${err}`);
                            return process.exit(1);
                        }
                        let json = [];
                        let id = generateRandomStringOfLength(32);
                        json.push({
                            name: req.body.name || "undefined",
                            icon: req.body.icon || returnBase64Image(path.resolve(`${api.FsOrigin}/../yourdash256.png`)),
                            id: id,
                            url: req.body.url || '/app/dash'
                        });
                        fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
                            if (err) {
                                log(`ERROR ${err}`);
                                return res.json({
                                    error: true
                                });
                            }
                            return res.json(json.filter((shortcut) => shortcut.id === id));
                        });
                    });
                });
            }
            else {
                fs.readFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
                    if (err) {
                        data = Buffer.from("[]");
                    }
                    let json = JSON.parse(data.toString());
                    let id = generateRandomStringOfLength(32);
                    json.push({
                        name: req.body.name || "undefined",
                        icon: req.body.icon || returnBase64Image(path.resolve(`${api.FsOrigin}/../yourdash256.png`)),
                        id: id,
                        url: req.body.url || '/app/dash'
                    });
                    fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
                        if (err) {
                            log(`ERROR ${err}`);
                            return res.json({
                                error: true
                            });
                        }
                        res.json(json.filter((shortcut) => shortcut.id === id));
                    });
                });
            }
        });
        app.post(`${api.ModulePath(this)}/panel/quick-shortcut/:id`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`)))
                return res.json({
                    error: true
                });
            fs.readFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
                if (err) {
                    log(`[${this.name}] ERROR: ${err}`);
                    return res.json({
                        error: true
                    });
                }
                let json = JSON.parse(data.toString());
                let shortcut = json.find((shortcut) => shortcut.id === req.params.id);
                if (shortcut === undefined)
                    return res.json({
                        error: true
                    });
                let shortcutInd = json.indexOf(shortcut);
                if (req.body.name)
                    json[shortcutInd].name = req.body.name;
                if (req.body.icon)
                    json[shortcutInd].icon = req.body.icon;
                if (req.body.url)
                    json[shortcutInd].url = req.body.url;
                fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
                    if (err) {
                        log(`[${this.name}] ERROR: ${err}`);
                        return res.json({
                            error: true
                        });
                    }
                });
                return res.json(json);
            });
        });
        app.delete(`${api.ModulePath(this)}/panel/quick-shortcut/:id`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`)))
                return res.json({
                    error: true
                });
            fs.readFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), (err, data) => {
                if (err) {
                    log(`[${this.name}] ERROR: ${err}`);
                    return res.json({
                        error: true
                    });
                }
                let json = JSON.parse(data.toString());
                json = json.filter((shortcut) => shortcut.id !== req.params.id);
                fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/panel/quick-shortcuts/shortcuts.json`), JSON.stringify(json), (err) => {
                    if (err) {
                        log(`[${this.name}] ERROR: ${err}`);
                        return res.json({
                            error: true
                        });
                    }
                });
                return res.json(json);
            });
        });
        app.get(`${api.ModulePath(this)}/instance/installed/apps`, (_req, res) => {
            if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
                fs.writeFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), JSON.stringify({
                    apps: []
                }), (err) => {
                    if (err)
                        return res.json({
                            error: true
                        });
                    return res.json({
                        apps: []
                    });
                });
            }
            fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
                if (err)
                    return res.json({
                        error: true
                    });
                let json = JSON.parse(data.toString()) || [];
                return res.json(json);
            });
        });
        app.get(`${api.ModulePath(this)}/instance/config`, (_req, res) => {
            return res.json({
                ...api.SERVER_CONFIG,
                instanceEncryptionKey: "REDACTED"
            });
        });
        app.get(`${api.ModulePath(this)}/instance/login/background`, (_req, res) => {
            return res.json({
                image: api.SERVER_CONFIG.loginPageConfig.background || ""
            });
        });
        app.get(`${api.ModulePath(this)}/instance/login/logo`, (_req, res) => {
            return res.json({
                image: api.SERVER_CONFIG.loginPageConfig.logo || ""
            });
        });
        app.get(`${api.ModulePath(this)}/instance/login/message`, (_req, res) => {
            return res.json({
                text: api.SERVER_CONFIG.loginPageConfig.message.content || ""
            });
        });
        app.get(`${api.ModulePath(this)}/instance/default/background`, (_req, res) => {
            return res.json({
                image: api.SERVER_CONFIG.defaultBackground
            });
        });
        app.get(`${api.ModulePath(this)}/instance/favicon`, (_req, res) => {
            return res.send(api.SERVER_CONFIG.favicon);
        });
        app.get(`${api.ModulePath(this)}/instance/logo`, (_req, res) => {
            return res.json({
                image: api.SERVER_CONFIG.logo
            });
        });
        app.get(`${api.ModulePath(this)}/instance/version`, (_req, res) => {
            return res.json({
                version: api.SERVER_CONFIG.version
            });
        });
        app.get('/test', (_req, res) => {
            res.send('yourdash instance');
        });
        app.get('/', (req, res) => {
            res.redirect(`https://yourdash.vercel.app/login/server/${req.url}`);
        });
    },
    unload() {
        log("WARNING: if the server hasn't been requested to shutdown a fatal problem has occurred! (the core module has been unloaded so expect core features to break)");
    },
    install() { },
};
export default Module;
