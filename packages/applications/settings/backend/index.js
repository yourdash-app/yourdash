import YourDashPanel from 'backend/src/helpers/panel.js';
import YourDashUnreadUser from 'backend/src/helpers/user.js';
import { PersonalServerAcceleratorCommunication } from 'backend/src/helpers/personalServerAccelerator.js';
const main = ({ app, io }) => {
    app.post('/app/settings/core/panel/position', (req, res) => {
        const { username } = req.headers;
        const { position } = req.body;
        const panel = new YourDashPanel(username);
        panel.setPanelPosition(position);
        return res.json({
            success: true
        });
    });
    app.post('/app/settings/core/panel/quick-shortcuts', (req, res) => {
        const { username } = req.headers;
        const { launcher } = req.body;
        const panel = new YourDashPanel(username);
        panel.setLauncherType(launcher);
        return res.json({ success: true });
    });
    app.get('/app/settings/debug/psa/update/:sessionId', async (req, res) => {
        const { sessionId } = req.params;
        const { username } = req.headers;
        const user = await (new YourDashUnreadUser(username).read());
        const psa = new PersonalServerAcceleratorCommunication(username, user.getSession(parseInt(sessionId, 10)));
        if (!psa.socketConnection) {
            return res.json({ success: false });
        }
        psa.emit('/core/update', true);
        return res.json({
            success: true,
            data: user.getSession(parseInt(sessionId, 10))
        });
    });
};
export default main;
//# sourceMappingURL=index.js.map