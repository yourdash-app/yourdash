import YourDashModule from "./../../module.js";

let module: YourDashModule = {
  id: "todo-app",
  name: "todo",
  load(app, api) {
    app.get(
      `${api.ModulePath(this)}/application/:applicationId`,
      (req, res) => {
        res.send(req.hostname);
      }
    );
  },
  install() {},
  unload() {},
};

export default module;
