export default class YourDashModule {
    name = "userManagement";
    id = "test@ewsgit.github.io";
    constructor() { }
    load(app) {
        app.get("/api/user/create/:username", (req, res) => {
            res.send(`hello new user ${req.params.username}`);
        });
    }
    unload() {
    }
    install() {
    }
}
