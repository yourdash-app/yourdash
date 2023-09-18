import path from "path";
export var authenticatedImageType;
(function (authenticatedImageType) {
    authenticatedImageType[authenticatedImageType["base64"] = 0] = "base64";
    authenticatedImageType[authenticatedImageType["file"] = 1] = "file";
})(authenticatedImageType || (authenticatedImageType = {}));
const authenticatedImages = {};
export function startAuthenticatedImageHelper(app) {
    app.get("/core/authenticated-img/:username/:id", (req, res) => {
        const { username, id } = req.params;
        const image = authenticatedImages?.[username]?.[id];
        if (!image) {
            return res.sendFile(path.resolve(process.cwd(), "./src/assets/default_avatar.avif"));
        }
        if (image.type === authenticatedImageType.base64) {
            const buf = Buffer.from(image.value, "base64");
            return res.send(buf);
        }
        if (image.type === authenticatedImageType.file) {
            return res.sendFile(image.value);
        }
        return res.sendFile(path.resolve(process.cwd(), "./src/assets/default_avatar.avif"));
    });
}
export default function authenticatedImage(username, type, value) {
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    if (!authenticatedImages[username]) {
        authenticatedImages[username] = {};
    }
    authenticatedImages[username][id] = {
        type,
        value
    };
    return `/core/authenticated-img/${username}/${id}`;
}
//# sourceMappingURL=authenticatedImage.js.map