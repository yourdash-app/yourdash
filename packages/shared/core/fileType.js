import pathBrowserify from "path-browserify";
export var FileTypes;
(function (FileTypes) {
    FileTypes[FileTypes["PlainText"] = 0] = "PlainText";
    FileTypes[FileTypes["Image"] = 1] = "Image";
    FileTypes[FileTypes["Video"] = 2] = "Video";
    FileTypes[FileTypes["Audio"] = 3] = "Audio";
})(FileTypes || (FileTypes = {}));
export default function getFileType(path) {
    const extension = pathBrowserify.extname(path).replace(".", "");
    switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
        case "webp":
        case "svg":
        case "avif":
            return FileTypes.Image;
        case "mp3":
        case "wav":
        case "aac":
        case "ogg":
        case "flac":
        case "m4a":
            return FileTypes.Audio;
        case "mp4":
        case "webm":
        case "mov":
        case "avi":
        case "av1":
            return FileTypes.Video;
        default:
            return FileTypes.PlainText;
    }
}
//# sourceMappingURL=fileType.js.map