import YourDashPanel from "backend/src/core/panel.js";
import YourDashUser from "backend/src/core/user/index.js";
import { PersonalServerAcceleratorCommunication } from "backend/src/helpers/personalServerAccelerator.js";
const main = ({ exp, io }) => {
    exp.post("/app/settings/core/panel/position", async (req, res) => {
        const { username } = req.headers;
        const { position } = req.body;
        const panel = new YourDashPanel(username);
        await panel.setPanelPosition(position);
        return res.json({
            success: true
        });
    });
    exp.post("/app/settings/core/panel/quick-shortcuts", (req, res) => {
        const { username } = req.headers;
        const { launcher } = req.body;
        const panel = new YourDashPanel(username);
        panel.setLauncherType(launcher);
        return res.json({ success: true });
    });
    exp.get("/app/settings/debug/psa/update/:sessionId", async (req, res) => {
        const { sessionId } = req.params;
        const { username } = req.headers;
        const user = new YourDashUser(username);
        const psa = new PersonalServerAcceleratorCommunication(username, user.getLoginSession(parseInt(sessionId, 10)));
        if (!psa.socketConnection) {
            return res.json({ success: false });
        }
        psa.emit("/core/update", true);
        return res.json({
            success: true,
            data: user.getLoginSession(parseInt(sessionId, 10))
        });
    });
};
export default main;
//# sourceMappingURL=index.js.map