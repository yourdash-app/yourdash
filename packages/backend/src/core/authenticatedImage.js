import path from "path";
import crypto from "crypto";
export var AUTHENTICATED_IMAGE_TYPE;
(function (AUTHENTICATED_IMAGE_TYPE) {
    AUTHENTICATED_IMAGE_TYPE[AUTHENTICATED_IMAGE_TYPE["BASE64"] = 0] = "BASE64";
    AUTHENTICATED_IMAGE_TYPE[AUTHENTICATED_IMAGE_TYPE["FILE"] = 1] = "FILE";
})(AUTHENTICATED_IMAGE_TYPE || (AUTHENTICATED_IMAGE_TYPE = {}));
const authenticatedImages = {};
export function startAuthenticatedImageHelper(app) {
    app.get("/core/authenticated-img/:username/:id", (req, res) => {
        const { username, id } = req.params;
        const image = authenticatedImages?.[username]?.[id];
        if (!image) {
            return res.sendFile(path.resolve(process.cwd(), "./src/assets/default_avatar.avif"));
        }
        if (image.type === AUTHENTICATED_IMAGE_TYPE.BASE64) {
            const buf = Buffer.from(image.value, "base64");
            return res.send(buf);
        }
        if (image.type === AUTHENTICATED_IMAGE_TYPE.FILE) {
            return res.sendFile(image.value);
        }
        return res.sendFile(path.resolve(process.cwd(), "./src/assets/default_avatar.avif"));
    });
}
export default function authenticatedImage(username, type, value) {
    const id = crypto.randomUUID();
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