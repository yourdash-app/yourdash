import { YourDashIconRawDictionary } from '../../../components/elements/icon/iconDictionary.js';
import YourDashModule from '../../module.js';
import fs from 'fs';
import { ENV } from '../../index.js';
import { generateRandomStringOfLength } from '../../encryption.js';
import { log } from "./../../libServer.js"

const module: YourDashModule = {
  install() {
    log(`the ${this.name} module was installed`)
  },
  load(request, _api) {
    request.get(`/list/create`, (req, res) => {
      const { username } = req.headers;
      if (!username) return res.json({ error: true });
      if (!fs.existsSync(`${ENV.UserAppData(req)}/${this.name}`))
        fs.mkdir(`${ENV.UserAppData}/${this.name}`, (err) => {
          if (err) return res.json({ error: true });
        });
      let listId = generateRandomStringOfLength(32);
      if (fs.existsSync(`${ENV.UserAppData(req)}/${this.name}/lists/${listId}`)) {
        listId = generateRandomStringOfLength(32);
        if (fs.existsSync(`${ENV.UserAppData(req)}/${this.name}/lists/${listId}`))
          return res.json({ error: true });
      }
      fs.writeFile(
        `${ENV.UserAppData(req)}/${this.name}/lists/${listId}/`,
        JSON.stringify({
          categories: [
            {
              id: 0,
              name: 'general',
              tasks: [
                {
                  description: '',
                  id: 0,
                  subTasks: [
                    {
                      description: '',
                      id: 0,
                      subTasks: [],
                      title: 'sample sub task',
                    },
                  ],
                  title: 'sample task',
                },
              ],
            },
          ],
          icon: YourDashIconRawDictionary[ 'alert-16' ],
          id: listId,
          name: 'Unnamed list',
        }),
        (err) => {
          if (err) return res.json({ error: true });
          return res.json({ id: listId });
        }
      );
    });
  },
  name: 'todo',
  unload() {
    log(`The ${this.name} module was unloaded`)
  },
};

export default module;

/*
/list
/get
:id
POST - update data
/task
/create
:id
POST - update
/create - returns list id
/lists - returns a list of all list ids
/recent
/lists - returns a list of all recent list ids
/tasks - returns a list of all recent task ids and their list
*/
