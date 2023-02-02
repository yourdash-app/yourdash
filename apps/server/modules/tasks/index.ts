import { type YourDashModule } from '../../module.js';
import fs from 'fs';
import { generateRandomStringOfLength } from '../../encryption.js';
import { log, resizeImage } from "../../libServer.js"
import path from 'path';
import { type TasksList } from "types/tasks/list.js"
import { type YourDashUser } from 'types/core/user.js';

const module: YourDashModule = {
  install() {
    log(`the ${this.name} module was installed`)
  },
  load(request, moduleApi) {
    request.post(`/personal/list/create`, (req, res) => {
      if (!fs.existsSync(`${moduleApi.UserAppData(req)}/${this.name}/lists`))
        fs.mkdir(`${moduleApi.UserAppData(req)}/${this.name}/lists`, { recursive: true }, err => {
          if (err) return res.json({ error: true });
        });

      const listId = generateRandomStringOfLength(32);

      if (fs.existsSync(`${moduleApi.UserAppData(req)}/${this.name}/lists/${listId}`))
        return res.json({ error: true });

      fs.writeFile(
          `${moduleApi.UserAppData(req)}/${this.name}/lists/${listId}.json`,
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
          err => {
            if (err) return res.json({ error: true });
            return res.json({ id: listId });
          }
      );
    });

    request.get(`/personal/lists`, (req, res) => {
      if (!fs.existsSync(`${moduleApi.UserAppData(req)}/${this.name}/lists`)) {
        fs.mkdir(`${moduleApi.UserAppData(req)}/${this.name}/lists`, { recursive: true }, err => {
          if (err) return res.json({ error: true });
        });

        return res.json({ lists: [] })
      }

      fs.readdir(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists`), (err, data) => {
        if (err) {
          log(`(${this.name}) ERROR: unable to read '${moduleApi.UserAppData(req)}/${this.name}'`)
          return res.json({ error: true })
        }

        const listsData = data.map(listName => {
          try {
            const listData = JSON.parse(fs.readFileSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${listName}`)).toString())
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

      if (!fs.existsSync(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`)) {
        return res.json({ error: true })
      }

      fs.rm(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`, err => {
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

      if (!fs.existsSync(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`)) {
        return res.json({ error: true })
      }

      fs.readFile(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`, (err, data) => {
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

      if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`))) {
        return res.json({ error: true })
      }

      fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`), JSON.stringify(req.body), err => {
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

      if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`))) {
        return res.json({ error: true })
      }

      fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`), (err, data) => {
        if (err) {
          return res.json({ error: true })
        }
        const json = JSON.parse(data.toString()) as TasksList

        return res.json(json.tasks[parseInt(req.params.taskId)])
      })
    })

    request.delete(`/personal/list/:listId/task/:taskId`, (req, res) => {
      if (!req.params.listId) {
        return res.json({ error: true })
      }

      if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`))) {
        return res.json({ error: true })
      }

      try {
        parseInt(req.params.taskId)
      } catch (err) {
        return res.json({ error: "taskId was not a valid integer" })
      }

      fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`), (err, data) => {
        if (err) {
          return res.json({ error: true })
        }
        const json = JSON.parse(data.toString()) as TasksList
        json.tasks.splice(parseInt(req.params.taskId), 1)

        fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`), JSON.stringify(json), err => {
          if (err) return res.json({ error: true })

          return res.json({ success: true })
        })
      })
    })

    request.get(`/personal/list/:listId/create/task`, (req, res) => {
      if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`))) {
        log(`no such file: ${path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`)}`)
        return res.json({ error: true })
      }

      fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`), (err, data) => {
        if (err) {
          log(`unable to read file: ${path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`)}`)
          return res.json({ error: true })
        }

        const json = JSON.parse(data.toString()) as TasksList

        json.tasks.push({
          assignees: [],
          description: "Why not give your task a description?",
          subTasks: [],
          tags: [],
          title: "Untitled Task",
        })

        fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`), JSON.stringify(json), err => {
          if (err) {
            log(`unable to write to file: ${path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${req.params.listId}.json`)}`)
            return res.json({ error: true })
          }

          return res.json({ id: json.tasks.length + 1 })
        })
      })
    })

    request.post(`/personal/list/:listId/task/:taskId`, (req, res) => {
      const {
        listId, taskId
      } = req.params

      if (!listId || !taskId) {
        log(`(${this.name}) ERROR: listId or taskId were not found in the request`)
        return res.json({ error: true })
      }

      if (!fs.existsSync(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${listId}.json`))) {
        log(`(${this.name}) no such list: ${listId}`)
        return res.json({ error: true })
      }

      fs.readFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${listId}.json`), (err, data) => {
        if (err) {
          log(`(${this.name}) unable to read ${listId}.json`)
          return res.json({ error: true })
        }

        const json = JSON.parse(data.toString()) as TasksList

        json.tasks[parseInt(taskId)] = req.body

        fs.writeFile(path.resolve(`${moduleApi.UserAppData(req)}/${this.name}/lists/${listId}.json`), JSON.stringify(json), err => {
          if (err) {
            log(`(${this.name}) ERROR: unable to write to ${listId}.json`)
            return res.json({ error: true })
          }

          return res.json({ success: true })
        })
      })
    })

    request.post(`/personal/list/:listId/task/:taskId/assignees`, (req, res) => {

      // todo: set the assignees to the received list

      const assignees = req.body.assignees


      res.json({ error: true })
    })

    request.get(`/assignee/:userName`, (req, res) => {
      if (!req.params.userName) return res.json({ error: true })

      if (!fs.existsSync(path.resolve(`${moduleApi.FsOrigin}/data/users/${req.params.userName}/user.json`)))
        return res.json({ error: true })

      fs.readFile(path.resolve(`${moduleApi.FsOrigin}/data/users/${req.params.userName}/user.json`), (err, data) => {
        if (err) {
          log(`(${this.name}) ERROR: no user named '${req.params.userName}'`)
          return res.json({ error: true })
        }

        const json = JSON.parse(data.toString()) as YourDashUser

        resizeImage(48, 48, json.profile.image, image => {
          if (err) {
            return res.json({ error: true })
          }

          return res.json({
            name: `${json.name.first} ${json.name.last}`,
            profile: { image },
            userName: json.userName,
          })
        }, () => {return res.json({ error: true })})
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
