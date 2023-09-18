import YourDashUser from "backend/src/core/user/index.js";
const main = ({ exp, io }) => {
    exp.get("/app/dash/user-full-name", async (req, res) => {
        const { username } = req.headers;
        const user = new YourDashUser(username);
        res.json(await user.getName());
    });
    exp.get("/app/dash/modules", async (req, res) => {
        const { username } = req.headers;
        const user = await new YourDashUser(username);
        res.json({ success: true });
    });
};
export default main;
//# sourceMappingURL=index.js.map