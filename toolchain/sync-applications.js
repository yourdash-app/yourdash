import fs from "fs"
import path from "node:path"

console.log(`Syncing applications!`)

function sync() {
    let apps = fs.readdirSync(path.resolve(`./apps/`))

    apps.forEach(app => {
        if (!fs.existsSync(path.resolve(`./apps/${app}/client`)))
            return console.error(`Application ${app} requires a ./client/ directory`)

        if (!fs.existsSync(path.resolve(`./apps/${app}/server`)))
            return console.error(`Application ${app} requires a ./server/ directory`)

        if (!fs.existsSync(path.resolve(`../client/src/app/apps/${app}`)))
            fs.mkdirSync(path.resolve(`../client/src/app/apps/${app}`))

        if (!fs.existsSync(path.resolve(`../server/src/apps/${app}`)))
            fs.mkdirSync(path.resolve(`../server/src/apps/${app}`))

        fs.cpSync(path.resolve(`./apps/${app}/client/`), path.resolve(`../client/src/app/apps/${app}`), {recursive: true})
        fs.cpSync(path.resolve(`./apps/${app}/server/`), path.resolve(`../server/src/apps/${app}`), {recursive: true})
        fs.cpSync(path.resolve(`./apps/${app}/application.json`), path.resolve(`../server/src/apps/${app}/application.json`))
    })
}

sync()
