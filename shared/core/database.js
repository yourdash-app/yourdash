export default class KeyValueDatabase {
    keys;
    constructor() {
        this.keys = {};
    }
    getValue(key) {
        return this.keys[key];
    }
    set(key, value) {
        this.keys[key] = value;
    }
    removeValue(key) {
        delete this.keys[key];
    }
    clear() {
        this.keys = {};
    }
    getKeys() {
        return Object.keys(this.keys);
    }
    getLength() {
        return Object.keys(this.keys).length;
    }
    doesKeyExist(key) {
        return Object.keys(this.keys).includes(key);
    }
}
//# sourceMappingURL=database.js.map