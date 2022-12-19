import { YourDashIconRawDictionary } from './../../../components/elements/icon/iconDictionary.js';
import fs from 'fs';
import { ENV } from '../../index.js';
import { generateRandomStringOfLength } from '../../encryption.js';
let module = {
    id: 'todo-app',
    name: 'todo',
    load(app, _api) {
        app.get(`/api/${this.name}/list/create`, (req, res) => {
            let { username } = req.headers;
            if (!username)
                return res.json({
                    error: true
                });
            if (!fs.existsSync(`${ENV.UserAppData(req)}/${this.name}`))
                fs.mkdir(`${ENV.UserAppData}/${this.name}`, (err) => {
                    if (err)
                        return res.json({
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
            fs.writeFile(`${ENV.UserAppData(req)}/${this.name}/lists/${listId}/`, JSON.stringify({
                id: listId,
                name: 'Unnamed list',
                icon: YourDashIconRawDictionary['alert-16'],
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
            }), (err) => {
                if (err)
                    return res.json({
                        error: true
                    });
                return res.json({
                    id: listId
                });
            });
        });
        app.post(`/api/${this.name}`, (req, res) => {
            console.log(req.body);
            return res.json({
                text: "hello from '/api/todo' POST",
                ...req.body
            });
        });
    },
    install() { },
    unload() { },
};
export default module;
