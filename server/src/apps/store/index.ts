import {type StorePromotedApplication} from '../../../../shared/apps/store/storePromotedApplication.js';
import YourDashUnreadApplication, {
  getAllApplications,
  type YourDashApplicationServerPlugin
} from '../../helpers/applications.js';
import {type IStoreCategory} from '../../../../shared/apps/store/storeCategory.js';
import {getInstanceLogoBase64} from '../../helpers/logo.js';
import getAllCategories, {getAllApplicationsFromCategory} from './helpers/categories.js';
import globalDatabase from '../../helpers/globalDatabase.js';

const promotedApplications: string[] = ['dash', 'store'];

const main: YourDashApplicationServerPlugin = ({app}) => {
  app.get('/app/store/promoted/applications', (_req, res) => {
    Promise.all(
      promotedApplications.map(async (app): Promise<StorePromotedApplication> => {
        const application = (await new YourDashUnreadApplication(app).read());
        return {
          name: application.getName(),
          backgroundImage: `data:image/png;base64,${ (await application.getStoreBackground()).toString('base64') }`,
          icon: `data:image/avif;base64,${ (await application.getIcon()).toString('base64') }`,
          displayName: application.getDisplayName(),
          installed: application.isInstalled()
        };
      })).then(out => res.json(out));
  });

  app.get('/app/store/categories', async (_req, res) => {
    const applications = await getAllApplications();

    const categories: {
      [ key: string ]: boolean
    } = {};

    for (const application of applications) {
      const unreadApp = new YourDashUnreadApplication(application);

      if (!unreadApp.exists()) {
        continue;
      }

      const app = await unreadApp.read();

      categories[app.getCategory()] = true;
    }

    return res.json(Object.keys(categories));
  });

  app.get('/app/store/category/:id', async (req, res) => {
    const {id} = req.params;

    if (!id) {
      return res.json({error: true});
    }

    const categories = await getAllCategories();

    if (!categories.includes(id)) {
      return res.json({error: `unknown category ${ id }`});
    }

    const categoryApplications = await getAllApplicationsFromCategory(id);

    const applicationsOutput: {
      name: string,
      icon: string,
      displayName: string
    }[] = [];

    await Promise.all(categoryApplications.map(async app => {
      const application = await new YourDashUnreadApplication(app).read();
      applicationsOutput.push({
        name: application.getName(),
        icon: `data:image/avif;base64,${ (await application.getIcon()).toString('base64') }`,
        displayName: application.getDisplayName()
      });
    }));

    return res.json(<IStoreCategory>{
      id,
      applications: applicationsOutput,
      icon: `data:image/avif;base64,${ getInstanceLogoBase64() }`,
      displayName: id.slice(0, 1).toUpperCase() + id.slice(1),
      promotedApplications,
      bannerImage: `data:image/avif;base64,${ getInstanceLogoBase64() }`
    });
  });

  app.get('/app/store/application/:id', async (req, res) => {
    const {id} = req.params;

    if (!id) {
      return res.json({error: true});
    }

    const unreadApplication = await new YourDashUnreadApplication(id);

    if (!(await unreadApplication.exists())) {
      return res.json({error: true});
    }

    const application = (await unreadApplication.read());

    return res.json({
      ...application.getRawApplicationData(),
      icon: `data:image/avif;base64,${ (await application.getIcon()).toString('base64') }`,
      installed: application.isInstalled()
    });
  });

  app.post('/app/store/application/install/:id', (req, res) => {
    const {id} = req.params;
    const application = new YourDashUnreadApplication(id);
    if (!application.exists()) {
      return res.json({error: true});
    }
    globalDatabase.set('installed_applications', [...globalDatabase.get('installed_applications'), id]);
    return res.json({success: true});
  });

  app.post('/app/store/application/uninstall/:id', (req, res) => {
    const {id} = req.params;
    const application = new YourDashUnreadApplication(id);
    if (!application.exists()) {
      return res.json({error: true});
    }
    globalDatabase.set('installed_applications', globalDatabase.get('installed_applications').filter(app => app !== id));
    return res.json({success: true});
  });
};

export default main;
