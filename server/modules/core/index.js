const Module = {
    name: 'core',
    id: 'core',
    load(app, _api) {
        app.get('/abc-xyz', (req, res) => {
            res.send(`hello from ${this.id}`);
        });
    },
    unload() { },
    install() { },
};
export default Module;
