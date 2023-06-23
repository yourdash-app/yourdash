export default class KeyValueDatabase {
    keys;
    constructor() {
        this.keys = {};
    }
    get(key) {
        return this.keys[key];
    }
    set(key, value) {
        this.keys[key] = value;
        changeOccured(this);
    }
    removeValue(key) {
        delete this.keys[key];
        changeOccured(this);
    }
    clear() {
        this.keys = {};
        changeOccured(this);
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
function changeOccured(db) {
    console.log('changeOccured: ', JSON.stringify(db, null, 2));
}
//# sourceMappingURL=database.js.map