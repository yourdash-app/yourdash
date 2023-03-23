const fs = require("fs")
const path = require("node:path");

console.log(`Syncing applications!`)

function sync() {
    let apps = fs.readdirSync(path.resolve(`./apps/`))

    apps.forEach(app => {
        if (!fs.existsSync(path.resolve(`./apps/${app}/frontend`)))
            return console.error(`Application ${app} requires a ./frontend/ directory`)

        if (!fs.existsSync(path.resolve(`./apps/${app}/backend`)))
            return console.error(`Application ${app} requires a ./backend/ directory`)

        if (!fs.existsSync(path.resolve(`../frontend/pages/app/a/${app}`)))
            fs.mkdirSync(path.resolve(`../frontend/pages/app/a/${app}`))

        if (!fs.existsSync(path.resolve(`../backend/src/appManager/apps/${app}`)))
            fs.mkdirSync(path.resolve(`../backend/src/appManager/apps/${app}`))

        fs.cpSync(path.resolve(`./apps/${app}/frontend/`), path.resolve(`../frontend/pages/app/a/${app}`), {recursive: true})
        fs.cpSync(path.resolve(`./apps/${app}/backend/`), path.resolve(`../backend/src/appManager/apps/${app}`), {recursive: true})
        fs.cpSync(path.resolve(`./apps/${app}/application.json`), path.resolve(`../backend/src/appManager/apps/${app}/application.json`))
    })
}

sync()
