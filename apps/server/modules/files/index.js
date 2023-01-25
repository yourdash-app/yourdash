import path from "path";
import { log } from "../../libServer.js";
import fs from "fs";
const defaultCategories = [
    {
        children: [
            {
                title: "Home",
                path: "/"
            }
        ],
        title: "Quick Access",
    }
];
const module = {
    name: "files",
    load(app, api) {
        app.get(`/user/quota`, (req, res) => {
            if (!fs.existsSync(`${api.UserFs}/user.json`))
                return res.send({ error: true });
            fs.readFile(`${api.UserFs}/user.json`, (err, data) => {
                if (err) {
                    log(`ERROR: unable to read file ${api.UserFs}/user.json`);
                    return;
                }
                const json = JSON.parse(data.toString());
                res.send({ quota: json.quota });
            });
        });
        app.get(`/user/quota/usage`, (req, res) => {
            fs.fstat(fs.openSync(`${api.UserFs(req)}`, "r"), (err, stats) => {
                if (err) {
                    log(`(${this.name}) ERROR: unable to fetch directory stats for user ${req.headers.username}`);
                    res.json({ error: true });
                }
                res.json({ usage: stats.size });
            });
        });
        app.get(`/sidebar/categories`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/files/sidebar`)))
                return fs.mkdir(path.resolve(`${api.UserAppData(req)}/files/sidebar`), { recursive: true }, err => {
                    if (err) {
                        log(`ERROR: unable to make directory: ${api.UserAppData(req)}/files/`);
                        return res.json({ error: true });
                    }
                    return res.json({ categories: [] });
                });
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/files/sidebar/categories.json`)))
                return res.json({ categories: [] });
            fs.readFile(path.resolve(`${api.UserAppData(req)}/files/sidebar/categories.json`), (err, data) => {
                if (err) {
                    log(`ERROR: couldn't read ${api.UserAppData(req)}/files/sidebar/categories.json`);
                    return res.json({ error: true });
                }
                const json = JSON.parse(data.toString());
                return res.json({ categories: json });
            });
        });
        app.get(`/sidebar/set/default`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/files/sidebar`)))
                return fs.mkdir(path.resolve(`${api.UserAppData(req)}/files/sidebar`), { recursive: true }, err => {
                    if (err) {
                        log(`ERROR: unable to make directory: ${api.UserAppData(req)}/files/`);
                        return res.json({ error: true });
                    }
                    return res.json([]);
                });
            fs.writeFile(path.resolve(`${api.UserAppData(req)}/files/sidebar/categories.json`), JSON.stringify(defaultCategories), err => {
                if (err) {
                    log(`ERROR: unable to write the defaults to ${path.resolve(`${api.UserAppData(req)}/files/sidebar/categories.json`)}`);
                    return res.json({ error: true });
                }
                return res.json({ categories: defaultCategories });
            });
        });
    },
    install() {
        return;
    },
    unload() {
        return;
    },
};
export default module;
