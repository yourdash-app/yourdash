import YourDashModule from '../../module.js';
import fs from 'fs';
import { generateRandomStringOfLength } from '../../encryption.js';
import { log } from "./../../libServer.js"
import path from 'path';
import TasksList from "./../../../types/tasks/list.js"

const module: YourDashModule = {
  install() {
    log(`the ${this.name} module was installed`)
  },
  load(request, api) {
    request.post(`/personal/list/create`, (req, res) => {
      if (!fs.existsSync(`${api.UserAppData(req)}/${this.name}/lists`))
        fs.mkdir(`${api.UserAppData(req)}/${this.name}/lists`, { recursive: true }, (err) => {
          if (err) return res.json({ error: true });
        });

      const listId = generateRandomStringOfLength(32);

      if (fs.existsSync(`${api.UserAppData(req)}/${this.name}/lists/${listId}`))
        return res.json({ error: true });

      fs.writeFile(
        `${api.UserAppData(req)}/${this.name}/lists/${listId}.json`,
        JSON.stringify({
          description: "Unknown description",
          id: `${listId}`,
          name: 'Unnamed list',
          tasks: [
            {
              assignees: [],
              description: "test description",
              subTasks: [],
              tags: [],
              title: 'general',
            },
          ],
          tags: []
        } as TasksList),
        (err) => {
          if (err) return res.json({ error: true });
          return res.json({ id: listId });
        }
      );
    });

    request.get(`/personal/lists`, (req, res) => {
      if (!fs.existsSync(`${api.UserAppData(req)}/${this.name}/lists`)) {
        fs.mkdir(`${api.UserAppData(req)}/${this.name}/lists`, { recursive: true }, (err) => {
          if (err) return res.json({ error: true });
        });

        return res.json({ lists: [] })
      }

      fs.readdir(path.resolve(`${api.UserAppData(req)}/${this.name}/lists`), (err, data) => {
        if (err) {
          log(`(${this.name}) ERROR: unable to read '${api.UserAppData(req)}/${this.name}'`)
          return res.json({ error: true })
        }

        const listsData = data.map((listName) => {
          try {
            const listData = JSON.parse(fs.readFileSync(path.resolve(`${api.UserAppData(req)}/${this.name}/lists/${listName}`)).toString())
            return {
              id: listData.id,
              name: listData.name,
            }
          } catch (e) {
            return
          }
        })

        return res.json({ lists: listsData })
      })
    })

    request.delete(`/personal/list/delete/:listId`, (req, res) => {
      if (!req.params.listId) {
        return res.json({ error: true })
      }

      if (!fs.existsSync(`${api.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`)) {
        return res.json({ error: true })
      }

      fs.rm(`${api.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`, (err) => {
        if (err) {
          return res.json({ error: true })
        }

        return res.json({ success: true })
      })
    })

    request.get(`/personal/list/:listId`, (req, res) => {
      if (!req.params.listId) {
        return res.json({ error: true })
      }

      if (!fs.existsSync(`${api.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`)) {
        return res.json({ error: true })
      }

      fs.readFile(`${api.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`, (err, data) => {
        if (err) {
          return res.json({ error: true })
        }

        const json = JSON.parse(data.toString()) as TasksList

        return res.json(json)
      })
    })

    request.post(`/personal/list/:listId`, (req, res) => {
      if (!req.params.listId) {
        return res.json({ error: true })
      }

      if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`))) {
        return res.json({ error: true })
      }

      fs.writeFile(path.resolve(`${api.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`), JSON.stringify(req.body), (err) => {
        if (err) {
          return res.json({ error: true })
        }

        return res.json({ success: true })
      })
    })

    request.get(`/personal/list/:listId/task/:taskId`, (req, res) => {
      if (!req.params.listId) {
        return res.json({ error: true })
      }

      if (!fs.existsSync(path.resolve(`${api.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`))) {
        return res.json({ error: true })
      }

      fs.readFile(path.resolve(`${api.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`), (err, data) => {
        if (err) {
          return res.json({ error: true })
        }

        const json = JSON.parse(data.toString()) as TasksList

        return res.json(json.tasks[ parseInt(req.params.taskId) ])
      })
    })

    request.get(`/assignee/:userName`, (req, res) => {
      if (!req.params.userName) return res.json({ error: true })

      if (!fs.existsSync(`${api.FsOrigin}/data/users/${req.params.userName}`))
        return res.json({ error: true })

      // TODO: fetch the user's profile data and return { userName: string, name: string (combination of first and last name), profile: { picture: string } }

      res.json({ error: "implement me!" })
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
