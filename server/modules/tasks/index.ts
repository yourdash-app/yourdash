import { YourDashIconRawDictionary } from '../../../components/elements/icon/iconDictionary.js';
import YourDashModule from '../../module.js';
import fs from 'fs';
import { ENV } from '../../index.js';
import { generateRandomStringOfLength } from '../../encryption.js';
import { log } from "./../../libServer.js"
import path from 'path';

const module: YourDashModule = {
  install() {
    log(`the ${this.name} module was installed`)
  },
  load(request, _api) {
    request.post(`/list/create`, (req, res) => {
      if (!fs.existsSync(`${ENV.UserAppData(req)}/${this.name}/lists`))
        fs.mkdir(`${ENV.UserAppData(req)}/${this.name}/lists`, { recursive: true }, (err) => {
          if (err) return res.json({ error: true });
        });

      const listId = generateRandomStringOfLength(32);

      if (fs.existsSync(`${ENV.UserAppData(req)}/${this.name}/lists/${listId}`))
        return res.json({ error: true });
      
      fs.writeFile(
        `${ENV.UserAppData(req)}/${this.name}/lists/${listId}.json`,
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

    request.get(`/personal/lists`, (req, res) => {
      if (!fs.existsSync(`${ENV.UserAppData(req)}/${this.name}/lists`)) {
        fs.mkdir(`${ENV.UserAppData(req)}/${this.name}/lists`, { recursive: true }, (err) => {
          if (err) return res.json({ error: true });
        });

        return res.json({ lists: [] })
      }
      
      fs.readdir(path.resolve(`${ENV.UserAppData(req)}/${this.name}/lists`), (err, data) => {
        if (err) {
          log(`(${this.name}) ERROR: unable to read '${ENV.UserAppData(req)}/${this.name}'`)
        }

        const listsData = data.map((listName) => {
          try {
            return JSON.parse(fs.readFileSync(path.resolve(`${ENV.UserAppData(req)}/${this.name}/lists/${listName}`)).toString()).name
          } catch (e) {
            return
          }
        })

        res.json({ lists: listsData })
      })
    })
  },
  name: 'tasks',
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
