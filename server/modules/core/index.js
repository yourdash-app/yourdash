export default class YourDashModule {
    name = "test module";
    id = "test@ewsgit.github.io";
    constructor() { }
    load(app) {
        app.get("/abc-xyz", (req, res) => {
            res.send(`hello from ${this.id}`);
        });
    }
    unload() {
    }
    install() {
    }
}
