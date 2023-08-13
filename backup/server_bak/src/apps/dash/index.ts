import {type YourDashApplicationServerPlugin} from '../../helpers/applications.js';
import YourDashUnreadUser from '../../helpers/user.js';

const main: YourDashApplicationServerPlugin = ({
  app,
  io
}) => {
  app.get('/app/dash/user-full-name', async (req, res) => {
    const {username} = req.headers as {
      username: string
    };

    const user = await new YourDashUnreadUser(username).read();

    res.json(user.getName());
  });

  // TODO: implement module system
  app.get('/app/dash/modules', async (req, res) => {
    const {username} = req.headers as {
      username: string
    };

    const user = await new YourDashUnreadUser(username).read();

    res.json({success: true});
  });
};

export default main;
