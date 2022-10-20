export default class YourDashModule {
    constructor() {
        this.name = "test module";
        this.id = "test@ewsgit.github.io";
    }
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
