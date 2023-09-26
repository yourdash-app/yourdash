import YourDashModule from "backend/src/core/yourDashModule.js";
export default class EndpointsModule extends YourDashModule {
    constructor(args) {
        super(args);
        this.API().request.get("/app/endpoints/endpoints", (req, res) => res.json(this.API().request._router.stack));
    }
}
//# sourceMappingURL=index.js.map