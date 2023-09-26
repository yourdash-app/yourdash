import YourDashModule from "backend/src/core/yourDashModule.js";
export default class CodeStudioModule extends YourDashModule {
    constructor(args) {
        super(args);
        this.API().request.get("/app/code_studio/", (req, res) => res.json({ success: true }));
    }
}
//# sourceMappingURL=index.js.map