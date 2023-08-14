const main = ({ app, io }) => {
    app.get("/app/endpoints/endpoints", (req, res) => res.json(app._router.stack));
};
export default main;
//# sourceMappingURL=index.js.map