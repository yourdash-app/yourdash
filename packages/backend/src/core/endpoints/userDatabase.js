export const userDatabases = new Map();
export default function defineUserDatabaseRoutes(exp) {
    exp.get("/core/user_db", async (req, res) => {
        const { username } = req.headers;
        console.log(userDatabases.get(username));
        return res.json(userDatabases.get(username) || {});
    });
    exp.post("/core/user_db", async (req, res) => {
        const { username } = req.headers;
        userDatabases.set(username, req.body);
        console.log(userDatabases.get(username));
        return res.json({ success: true });
    });
}
//# sourceMappingURL=userDatabase.js.map