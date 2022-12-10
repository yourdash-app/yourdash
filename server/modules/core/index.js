const Module = {
    name: 'core',
    id: 'core',
    load(app, _api) {
        app.get('/api/create/shortcut', (req, res) => {
            res.json({ text: `hello from ${this.id}` });
        });
        app.get('/api/delete/shortcut', (req, res) => {
            res.json({ text: `hello from ${this.id}` });
        });
    },
    unload() { },
    install() { },
};
export default Module;
