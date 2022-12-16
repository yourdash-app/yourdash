import YourDashModule from './../../module.js';

let module: YourDashModule = {
  id: 'todo-app',
  name: 'todo',
  load(app, _api) {
    app.get(`/api/store`, (req, res) => {
      res.send(req.hostname)
    })
  },
  install() { },
  unload() { },
};

export default module;