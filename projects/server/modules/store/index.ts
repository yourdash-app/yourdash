import path from "path";
import {type YourDashModule} from "../../module.js";
import fs from "fs"
import includedApps, {DEFAULT_APPS} from "../../includedApps.js"
import {log, resizeImage} from "../../libServer.js";
import {type InstalledApplicationList} from "types/store/applicationList.js";
import {type YourDashServerConfig} from "../../index.js";
import {type YourDashUser, YourDashUserPermissions} from "types/core/user.js"

const module: YourDashModule = {
    requiredModules: [],
    configuration: {},
    install: () => {
        return 0
    },
    uninstall: () => {
        return 0
    },
    load(request, moduleApi) {
        if (!fs.existsSync(`${moduleApi.FsOrigin}/installed_apps.json`)) {
            fs.writeFile(`${moduleApi.FsOrigin}/installed_apps.json`, JSON.stringify(DEFAULT_APPS), err => {
                if (err) {
                    log(`(store) ERROR: unable to write required file installed_apps.json`)
                    return process.exit(1)
                }
            })
        }

        request.get(`/list/applications`, (req, res) => {
            Promise.all(
                includedApps.map(app => {
                        return new Promise((resolve, reject) => {
                            resizeImage(
                                96,
                                96,
                                path.resolve(`${moduleApi.FsOrigin}/../assets/apps/${app.icon}`),
                                image => {
                                    const application = {...app}
                                    application.icon = image
                                    return resolve(application)
                                },
                                () => {
                                    return reject()
                                })
                        })
                    }
                )
            )
                .catch(() => {
                    return res.json({error: true})
                })
                .then(resp => {
                    return res.json(resp)
                })
        })

        request.get(`/list/categories`, (req, res) => {
            const categories = new Set()

            includedApps.forEach(app => {
                return categories.add(app.category)
            })

            return res.json(Array.from(categories))
        })

        request.get(`/list/category/:categoryName/applications`, (req, res) => {
            const applications = includedApps.filter(app => {
                return app.category === req.params.categoryName
            })

            Promise.all(
                applications.map(app => {
                        return new Promise((resolve, reject) => {
                            resizeImage(
                                96,
                                96,
                                path.resolve(`${moduleApi.FsOrigin}/../assets/apps/${app.icon}`),
                                image => {
                                    const application = {...app}
                                    application.icon = image
                                    return resolve(application)
                                },
                                () => {
                                    return reject()
                                })
                        })
                    }
                )
            ).then(resp => {
                return res.json(resp)
            })
        })

        request.get(`/application/:applicationId`, (req, res) => {
            fs.readFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), (err, data) => {
                if (err) {
                    log("ERROR: couldn't read installed_apps.json")
                    return res.json({error: true})
                }

                const json = JSON.parse(data.toString()) as string[]
                const result = includedApps.find(obj => {
                    return obj.name === req.params.applicationId
                })

                if (!result) {
                    log(`ERROR: no store product found named: ${req.params.applicationId}`)
                    return res.json({error: true})
                }

                resizeImage(284, 284, path.resolve(`${moduleApi.FsOrigin}/../assets/apps/${result.icon}`), image => {
                    const installed = json.includes(includedApps.filter(app => {
                        return app.name === req.params.applicationId
                    })[0].name)

                    return res.json({
                        ...result,
                        icon: image,
                        installed,
                        uninstallable: (result?.name !== "dash") && (result?.name !== "store") && (result?.name !== "settings") && (result?.name !== "files")
                    })
                }, () => {
                    return res.json({error: true})
                })
            })
        })

        request.get(`/installed/apps`, (req, res) => {
            fs.readFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), (err, data) => {
                if (err) {
                    log("ERROR: couldn't read installed_apps.json")
                    return res.json({error: true})
                }
                const json = JSON.parse(data.toString()) as string[]
                const result = includedApps.filter(app => {
                    return json.includes(app.name)
                }) || []
                return res.json(
                    result.map(item => {
                        return {
                            description: item.description,
                            displayName: item.displayName,
                            icon: {store: item.icon},
                            name: item.name,
                            path: item.path
                        } as InstalledApplicationList
                    })
                )
            })
        })

        request.post(`/application/:applicationId/install`, (req, res) => {
            if (!fs.existsSync(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`))) {
                const json = DEFAULT_APPS as string[]
                json.push(req.params.applicationId)
                fs.writeFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), JSON.stringify(json), err => {
                    if (err) {
                        log(`ERROR: couldn't write installed_apps.json`)
                        return res.json({error: true})
                    }
                    return res.json({
                        installed: includedApps.filter(app => {
                            return json.includes(app.name)
                        }).find(obj => {
                            return obj.name === req.params.applicationId
                        }) !== undefined
                    })
                })

                fs.writeFile(
                    path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`),
                    JSON.stringify([
                        ...DEFAULT_APPS
                    ]),
                    err => {
                        if (err) return res.json({error: true});
                    }
                );
            }
            fs.readFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), (err, data) => {
                if (err) {
                    log("ERROR: couldn't read installed_apps.json")
                    return res.json({error: true})
                }

                const json = JSON.parse(data.toString()) as string[]
                json.push(req.params.applicationId)

                fs.readFile(path.resolve(`${moduleApi.FsOrigin}/yourdash.config.json`), (err, data) => {
                    if (err) {
                        log(`(Store) ERROR: unable to read yourdash.config.json`)
                        return res.json({error: true})
                    }

                    const json = JSON.parse(data.toString()) as YourDashServerConfig
                    const application = includedApps.find(application => {
                        return application.name === req.params.applicationId
                    })

                    if (!application) {
                        log(`(Store) ERROR: unknown application ${req.params.applicationId}`)
                        return res.json({error: true})
                    }

                    application.moduleRequirements.forEach((moduleRequirement: string) => {
                        json.activeModules.push(moduleRequirement)
                    })

                    fs.writeFile(path.resolve(`${moduleApi.FsOrigin}/yourdash.config.json`), JSON.stringify(json), err => {
                        if (err) {
                            log(`(Store) ERROR: unable to`)
                        }
                    })
                })

                fs.writeFile(path.resolve(`${moduleApi.FsOrigin}/installed_apps.json`), JSON.stringify(json), err => {
                    if (err) {
                        log(`ERROR: couldn't write installed_apps.json`)
                        return res.json({error: true})
                    }
                    return res.json({
                        installed: includedApps.filter(app => {
                            return json.includes(app.name)
                        }).find(obj => {
                            return obj.name === req.params.applicationId
                        }) !== undefined
                    })
                })
            })
        })

        request.delete(`/application/:applicationId`, (req, res) => {
            fs.readFile(path.resolve(`${moduleApi.UserFs(req)}/user.json`), (err, data) => {
                if (err) {
                    log(`(store) ERROR: unable to read ${req.headers.username}'s user.json`)
                    return res.json({error: true})
                }

                const user = JSON.parse(data.toString()) as YourDashUser

                if (
                    user?.permissions?.indexOf(YourDashUserPermissions.RemoveApplications) === -1 &&
                    user?.permissions?.indexOf(YourDashUserPermissions.Administrator) === -1
                ) {
                    log(`user "${req.headers.username}" has tried to uninstall application ${req.params.applicationId} but failed due to not having the RemoveApplications permission`)
                    return res.json({installed: true})
                }

                fs.readFile(`${moduleApi.FsOrigin}/installed_apps.json`, (err, data) => {
                    if (err) {
                        log(`(store) ERROR: unable to read installed_apps.json`)
                        return res.json({error: true})
                    }

                    let json = JSON.parse(data.toString()) as string[]

                    const application = includedApps.find(application => {
                        return application.name === req.params.applicationId
                    })

                    if (!application) {
                        log(`(store) ERROR: no application with the name ${req.params.applicationId} exists`)
                        return res.json({error: true})
                    }

                    json = json.filter(app => {
                        return app !== req.params.applicationId
                    })

                    fs.writeFile(`${moduleApi.FsOrigin}/installed_apps.json`, JSON.stringify(json), err => {
                        if (err) {
                            log(`(store) ERROR: unable to write installed_apps.json`)
                            return res.json({error: true})
                        }

                        res.json({installed: false})
                    })
                })
            })
        })
    },
    unload() {
        return 0
    },
};

export default module;