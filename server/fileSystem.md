# YourDash Server Filesystem layout

## `FsOrigin`

### Portable / Dev modes

`FsOrigin = ./fs/`

### Production

`FsOrigin = /var/YourDash/`

## FileSystem layout

`FsOrigin yourdash.config.json config/ test@ewsgit.github.io/ [extension config files] data/ users/ [user uuid]/ user.json settings.json files/ [user files root] temp/ [temporary files] groups/ [group uuid]/ group.json settings.json files/ [group files root] temp/ [temporary files]`
