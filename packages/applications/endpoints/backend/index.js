const main = ({ exp, io }) => {
    exp.get("/app/endpoints/endpoints", (req, res) => res.json(exp._router.stack));
};
export default main;
//# sourceMappingURL=index.js.map