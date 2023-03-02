import { type SideBarCategory } from "types/files/SideBar.js";
import path from "path";
import { type YourDashUser } from "types/core/user.js";
import { log } from "../../libServer.js";
import { type YourDashModule } from "../../module.js";
import fs from "fs";
import { type filesFile } from "types/files/file.js";
import { type filesDirectory } from "types/files/directory.js";

const defaultCategories: SideBarCategory[] = [
    {
        children: [
            {
                title: "Home",
                path: "/",
            },
        ],
        title: "Quick Access",
    },
];

const module: YourDashModule = {
    load(request, api) {
        request.get(`/user/quota`, (req, res) => {
            if (!fs.existsSync(`${api.UserFs}/user.json`)) return res.send({ error: true });
            fs.readFile(`${api.UserFs}/user.json`, (err, data) => {
                if (err) {
                    log(`ERROR: unable to read file ${api.UserFs}/user.json`);
                    return;
                }
                const json = JSON.parse(data.toString()) as YourDashUser;
                res.send({ quota: json.quota });
            });
        });

        request.get(`/user/quota/usage`, (req, res) => {
            fs.fstat(fs.openSync(`${api.UserFs(req)}`, "r"), (err, stats) => {
                if (err) {
                    log(`(files) ERROR: unable to fetch directory stats for user ${req.headers.username}`);
                    res.json({ error: true });
                }

                res.json({ usage: stats.size });
            });
        });

        request.get(`/sidebar/categories`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/files/sidebar`)))
                return fs.mkdir(path.resolve(`${api.UserAppData(req)}/files/sidebar`), { recursive: true }, (err) => {
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

        request.get(`/sidebar/set/default`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/files/sidebar`)))
                return fs.mkdir(path.resolve(`${api.UserAppData(req)}/files/sidebar`), { recursive: true }, (err) => {
                    if (err) {
                        log(`ERROR: unable to make directory: ${api.UserAppData(req)}/files/`);
                        return res.json({ error: true });
                    }
                    return res.json([]);
                });
            fs.writeFile(
                path.resolve(`${api.UserAppData(req)}/files/sidebar/categories.json`),
                JSON.stringify(defaultCategories),
                (err) => {
                    if (err) {
                        log(
                            `ERROR: unable to write the defaults to ${path.resolve(
                                `${api.UserAppData(req)}/files/sidebar/categories.json`
                            )}`
                        );
                        return res.json({ error: true });
                    }
                    return res.json({ categories: defaultCategories });
                }
            );
        });

        request.get(`/dir/list/`, async (req, res) => {
            if (!req?.query?.path) return res.json({ error: true });

            if (req.query.path === "") return res.json({ error: true });

            if (!fs.existsSync(`${api.UserFs(req)}${req.query.path}`)) return res.json({ error: true });

            return res.json(
                fs.readdirSync(path.resolve(`${api.UserFs(req)}${req.query.path}`)).map((itemName) => {
                    const item = fs.statSync(path.resolve(`${api.UserFs(req)}${req.query.path}/${itemName}`));

                    return {
                        path: req.query.path,
                        type: item.isFile() ? "file" : "directory",
                        name: itemName,
                    } as filesFile | filesDirectory;
                })
            );
        });

        request.get(`/file/`, async (req, res) => {
            if (!req?.query?.path) return res.json({ error: true });

            if (req.query.path === "") return res.json({ error: true });

            if (!fs.existsSync(`${api.UserFs(req)}${req.query.path}`)) return res.json({ error: true });

            return res.json({
                content: fs.readFileSync(`${api.UserFs(req)}${req.query.path}`).toString(),
            });
        });

        // TODO: make this work
        request.post(`/file/create`, (req, res) => {
            if (!req?.query?.path) return res.json({ error: true });

            if (req.query.path === "") return res.json({ error: true });

            if (!fs.existsSync(`${api.UserFs(req)}${req.query.path}`)) return res.json({ error: true });

            const pathObject = req.query.path as string[];
            if (!pathObject) return;
            pathObject.pop();
        });
    },
    install: () => {
        return 0;
    },
    unload: () => {
        return 0;
    },
    requiredModules: [],
    uninstall: () => {
        return 0;
    },
    configuration: {},
};

export default module;
