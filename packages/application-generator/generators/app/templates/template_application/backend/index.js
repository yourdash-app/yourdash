import YourDashUnreadUser from 'backend/src/helpers/user.js';
const main = ({ app, io }) => {
    app.get('/app/dash/user-full-name', async (req, res) => {
        const { username } = req.headers;
        const user = await new YourDashUnreadUser(username).read();
        res.json(user.getName());
    });
    app.get('/app/dash/modules', async (req, res) => {
        const { username } = req.headers;
        const user = await new YourDashUnreadUser(username).read();
        res.json({ success: true });
    });
};
export default main;
//# sourceMappingURL=index.js.map