import path from "path";
import fs from "fs";
import includedApps from "./../../releaseData/includedApps.js";
import { log, resizeBase64Image } from "../../libServer.js";
let module = {
    name: "store",
    load(app, api) {
        app.get(`${api.ModulePath(this)}/included/apps`, (req, res) => {
            let output = includedApps.map((app) => {
                delete app.icon.launcher;
                delete app.icon.quickShortcut;
                return resizeBase64Image(96, 96, app.icon.store).then((image) => {
                    app.icon.store = image;
                    return app;
                });
            });
            Promise.all(output)
                .then((resp) => {
                res.json(resp);
            });
        });
        app.get(`${api.ModulePath(this)}/application/:applicationId`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
                let defaultApps = ["dash", "store", "settings", "files"];
                fs.writeFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), JSON.stringify([
                    ...defaultApps
                ]), (err) => {
                    if (err)
                        return res.json({
                            error: true
                        });
                    return res.json(defaultApps);
                });
            }
            fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
                if (err) {
                    log("ERROR: couldn't read installed_apps.json");
                    return res.json({
                        error: true
                    });
                }
                let json = JSON.parse(data.toString());
                let result = includedApps.find((obj) => obj.name === req.params.applicationId);
                return res.json({
                    ...result,
                    installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined,
                    uninstallable: (result?.name !== "dash") && (result?.name !== "store") && (result?.name !== "settings") && (result?.name !== "files")
                });
            });
        });
        app.get(`${api.ModulePath(this)}/installed/apps`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
                let defaultApps = ["dash", "store", "settings", "files"];
                fs.writeFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), JSON.stringify([
                    ...defaultApps
                ]), (err) => {
                    if (err) {
                        log(`ERROR: cannot write installed_apps.json`);
                        return res.json({
                            error: true
                        });
                    }
                    res.json(defaultApps);
                });
            }
            else {
                fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
                    if (err) {
                        log("ERROR: couldn't read installed_apps.json");
                        return res.json({
                            error: true
                        });
                    }
                    let json = JSON.parse(data.toString());
                    var result = includedApps.filter((app) => json.includes(app.name)) || [];
                    return res.json(result.map((item) => {
                        return {
                            name: item.name,
                            description: item.description,
                            displayName: item.displayName,
                            icon: {
                                store: item.icon.store
                            },
                            path: item.path
                        };
                    }));
                });
            }
        });
        app.get(`${api.ModulePath(this)}/application/:applicationId/install`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.FsOrigin}/installed_apps.json`))) {
                let defaultApps = ["dash", "store", "settings", "files"];
                fs.writeFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), JSON.stringify([
                    ...defaultApps
                ]), (err) => {
                    if (err)
                        return res.json({
                            error: true
                        });
                    return res.json(defaultApps);
                });
            }
            fs.readFile(path.resolve(`${api.FsOrigin}/installed_apps.json`), (err, data) => {
                if (err) {
                    log("ERROR: couldn't read installed_apps.json");
                    return res.json({
                        error: true
                    });
                }
                let json = JSON.parse(data.toString());
                let result = includedApps.find((obj) => obj.name === req.params.applicationId);
                return res.json({
                    ...result,
                    installed: includedApps.filter((app) => json.includes(app.name)).find((obj) => obj.name === req.params.applicationId) !== undefined,
                    uninstallable: (result?.name !== "dash") && (result?.name !== "store") && (result?.name !== "settings") && (result?.name !== "files")
                });
            });
        });
    },
    install() { },
    unload() { },
};
export default module;
