import { YourDashIconRawDictionary } from './../../../components/elements/icon/iconDictionary.js';
import YourDashModule from './../../module.js';
import fs from 'fs';
import { ENV } from '../../index.js';
import { generateRandomStringOfLength } from '../../encryption.js';

let module: YourDashModule = {
  name: 'todo',
  load(app, _api) {
    app.get(`/api/${this.name}/list/create`, (req, res) => {
      let { username } = req.headers;
      if (!username) return res.json({
        error: true
      });
      if (!fs.existsSync(`${ENV.UserAppData(req)}/${this.name}`))
        fs.mkdir(`${ENV.UserAppData}/${this.name}`, (err) => {
          if (err) return res.json({
            error: true
          });
        });
      let listId = generateRandomStringOfLength(32);
      if (fs.existsSync(`${ENV.UserAppData(req)}/${this.name}/lists/${listId}`)) {
        listId = generateRandomStringOfLength(32);
        if (fs.existsSync(`${ENV.UserAppData(req)}/${this.name}/lists/${listId}`))
          return res.json({
            error: true
          });
      }
      fs.writeFile(
        `${ENV.UserAppData(req)}/${this.name}/lists/${listId}/`,
        JSON.stringify({
          id: listId,
          name: 'Unnamed list',
          icon: YourDashIconRawDictionary[ 'alert-16' ],
          categories: [
            {
              name: 'general',
              id: 0,
              tasks: [
                {
                  id: 0,
                  title: 'sample task',
                  description: '',
                  subTasks: [
                    {
                      id: 0,
                      title: 'sample sub task',
                      description: '',
                      subTasks: [],
                    },
                  ],
                },
              ],
            },
          ],
        }),
        (err) => {
          if (err) return res.json({
            error: true
          });
          return res.json({
            id: listId
          });
        }
      );
    });
    app.post(`/api/${this.name}`, (req, res) => {
      console.log(req.body)
      return res.json({
        text: "hello from '/api/todo' POST",
        ...req.body
      })
    })
  },
  install() { },
  unload() { },
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
