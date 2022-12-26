import path from "path";
import { log } from "../../libServer.js";
import fs from "fs";
let module = {
    name: "files",
    load(app, api) {
        app.get(`${api.ModulePath(this)}/user/quota`, (req, res) => {
            if (!fs.existsSync(`${api.UserFs}/user.json`))
                return res.send({
                    error: true
                });
            fs.readFile(`${api.UserFs}/user.json`, (err, data) => {
                if (err) {
                    log(`ERROR: unable to read file ${api.UserFs}/user.json`);
                    return;
                }
                let json = JSON.parse(data.toString());
                res.send({
                    quota: json.quota
                });
            });
        });
        app.get(`${api.ModulePath(this)}/sidebar/categories`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/files/`))) {
                fs.mkdir(path.resolve(`${api.UserAppData(req)}/files/`), {
                    recursive: true
                }, (err) => {
                    if (err) {
                        log(`ERROR: unable to make directory: ${api.UserAppData(req)}/files/`);
                        return res.json({
                            error: true
                        });
                    }
                    res.json([]);
                });
            }
            return res.json({
                error: true
            });
        });
        app.get(`${api.ModulePath(this)}/sidebar/set/default`, (req, res) => {
        });
    },
    install() { },
    unload() { },
};
export default module;
