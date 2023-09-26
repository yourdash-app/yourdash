import YourDashModule from "backend/src/core/yourDashModule.js";
export default class YourDevModule extends YourDashModule {
    constructor(args) {
        super(args);
        this.API().request.get("/app/yourdev/", (req, res) => {
            return res.json({ success: true });
        });
    }
}
//# sourceMappingURL=index.js.map