import { promises as fs } from "fs";
import path from "path";
import YourDashUser from "backend/src/core/user/index.js";
import authenticatedImage, { authenticatedImageType } from "backend/src/core/authenticatedImage.js";
import sharp from "sharp";
import getFileType, { FileTypes } from "shared/core/fileType.js";
const main = ({ exp }) => {
    exp.post("/app/files/get", async (req, res) => {
        const { username } = req.headers;
        if (!req.body.path) {
            return res.json({ files: [] });
        }
        const user = new YourDashUser(username);
        let files = [];
        try {
            files = await fs.readdir(path.join(user.path, "fs/", req.body.path));
        }
        catch (_err) {
            files = [];
        }
        Promise.all(files.map(async (file) => {
            try {
                const type = (await fs.lstat(path.join(user.path, "fs/", req.body.path, file))).isFile()
                    ? "file"
                    : "directory";
                const name = path.basename(path.join(user.path, "fs/", req.body.path, file));
                return {
                    type,
                    name
                };
            }
            catch (_err) {
                return false;
            }
        })).then(outputFiles => {
            return res.json({
                files: outputFiles.filter(file => !!file)
            });
        });
    });
    exp.post("/app/files/get/thumbnails-small", async (req, res) => {
        const { username } = req.headers;
        if (!req.body.path) {
            return res.json({ files: [] });
        }
        const user = new YourDashUser(username);
        let files = [];
        console.log(`PATH: ${path.join(user.path, "fs/", req.body.path)}`);
        console.log(`USER PATH: ${path.resolve("fs/", user.path)}`);
        try {
            files = await fs.readdir(path.join(user.path, "fs/", req.body.path));
        }
        catch (_err) {
            files = [];
        }
        return res.json({
            files: (await Promise.all(files.map(async (file) => {
                try {
                    const type = (await fs.lstat(path.join(user.path, "fs/", req.body.path, file))).isFile()
                        ? "file"
                        : "directory";
                    const name = path.basename(path.join(user.path, "fs/", req.body.path, file));
                    const extension = path.extname(path.join(user.path, "fs/", req.body.path, file));
                    let icon = "";
                    switch (extension) {
                        case ".png":
                        case ".jpg":
                        case ".jpeg":
                        case ".webp":
                        case ".avif":
                        case ".svg":
                        case ".gif":
                            if ((await fs.stat(path.join(user.path, "fs/", req.body.path, file))).size > 1024 * 1024) {
                                icon = "";
                            }
                            else {
                                const image = sharp(path.join(user.path, "fs/", req.body.path, file)).resize(96, 96);
                                icon = authenticatedImage(username, authenticatedImageType.BASE64, (await image.toBuffer()).toString("base64"));
                            }
                            break;
                        default:
                            break;
                    }
                    return {
                        type,
                        name,
                        icon
                    };
                }
                catch (_err) {
                    return false;
                }
            }))).filter(file => !!file)
        });
    });
    exp.post("/app/files/get/file", async (req, res) => {
        const { username } = req.headers;
        if (!req.body.path) {
            return res.send("[YOURDASH] Error: Unknown file");
        }
        const user = new YourDashUser(username);
        const filePath = path.join(user.path, "fs/", req.body.path);
        try {
            switch (getFileType(filePath)) {
                case FileTypes.PlainText:
                    return res.send((await fs.readFile(filePath)).toString());
                case FileTypes.Image:
                    return res.send(authenticatedImage(username, authenticatedImageType.FILE, filePath));
                default:
                    return res.send("[YOURDASH] Error: Unsupported file type");
            }
        }
        catch (_err) {
            return res.send("[YOURDASH] Error: Unable to read file");
        }
    });
};
export default main;
//# sourceMappingURL=index.js.map