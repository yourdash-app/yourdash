const Module = {
    name: 'core',
    id: 'core',
    load(app, _api) {
        app.get('/api/create/shortcut', (req, res) => {
            res.send(`hello from ${this.id}`);
        });
        app.get('/api/delete/shortcut', (req, res) => {
            res.send(`hello from ${this.id}`);
        });
    },
    unload() { },
    install() { },
};
export default Module;
