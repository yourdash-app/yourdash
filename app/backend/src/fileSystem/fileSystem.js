import * as fs from "fs";
import * as nodePath from "path";
const Fs = {
    createFile(...path) {
        return new FileSystemFile(path);
    },
    createFolder(...path) {
        return new FileSystemFolder(path);
    },
    openFile(...path) {
        let contents = fs.readFileSync(nodePath.resolve(nodePath.join(...path)));
        return new FileSystemFile(path, contents);
    },
    openFolder(...path) {
        return new FileSystemFolder(path);
    },
};
class FileSystemFile {
    path;
    content;
    constructor(path, content) {
        this.path = nodePath.join(...path);
        this.content = content || "";
    }
    write() {
        try {
            fs.writeFileSync(nodePath.resolve(this.path), this.content);
        }
        catch (err) {
            console.error(err);
        }
        return this;
    }
    read() {
        return this.content.toString();
    }
    readRaw() {
        return this.content;
    }
    setContent(content) {
        this.content = content;
        return this;
    }
    move(path) {
        try {
            try {
                fs.rmSync(this.path);
            }
            catch (err) {
                return this;
            }
            this.path = nodePath.join(...path);
            fs.writeFileSync(nodePath.resolve(this.path), this.content);
        }
        catch (err) {
            console.error(err);
        }
        return this;
    }
    delete() {
        try {
            fs.rmSync(this.path);
        }
        catch (err) {
            console.error(err);
        }
        return null;
    }
}
class FileSystemFolder {
    path;
    constructor(path) {
        this.path = nodePath.join(...path);
    }
    write() {
        try {
            fs.mkdirSync(nodePath.resolve(this.path), { recursive: true });
        }
        catch (err) {
            console.error(err);
        }
        return this;
    }
    read() {
        try {
            return fs.readdirSync(nodePath.resolve(this.path));
        }
        catch (err) {
            console.error(err);
        }
        return null;
    }
    move(path) {
        try {
            fs.cpSync(nodePath.resolve(this.path), nodePath.join(...path), { recursive: true });
            fs.rmSync(this.path);
            this.path = nodePath.join(...path);
        }
        catch (err) {
            console.error(err);
        }
        return this;
    }
    delete() {
        try {
            fs.rmdirSync(this.path);
        }
        catch (err) {
            console.error(err);
        }
        return null;
    }
    createFile(...path) {
        return new FileSystemFile([this.path, ...path]);
    }
    openFile(...path) {
        let contents = fs.readFileSync(nodePath.resolve(nodePath.join(this.path, ...path)));
        return new FileSystemFile([this.path, ...path], contents);
    }
}
export default Fs;
