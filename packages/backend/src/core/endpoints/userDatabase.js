export const userDatabases = new Map();
export default function defineUserDatabaseRoutes(exp) {
    exp.get("/core/user_db", async (req, res) => {
        const { username } = req.headers;
        return res.json(userDatabases.get(username) || {});
    });
    exp.post("/core/user_db", async (req, res) => {
        const { username } = req.headers;
        userDatabases.set(username, req.body);
        return res.json({ success: true });
    });
}
//# sourceMappingURL=userDatabase.js.map