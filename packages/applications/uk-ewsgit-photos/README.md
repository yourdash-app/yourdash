# YourDash Photos "photos"

For editing and browsing your photos / videos

## Credits

- Frontend & backend - [Ewsgit](https://github.com/ewsgit)


# API
  - get all albums in path                // /albums/@/[albumPath]
    - get all albums shared with the user //   /shared
  - searching for media                   // /media/search/[query]
    - small-grid                          //   /small-grid
    - medium-grid                         //   /medium-grid
    - large-grid                          //   /large-grid
    - list                                //   /list
  - viewing media albums                  // /media/album
    - small-grid                          //   /small-grid/@/[albumPath]
    - medium-grid                         //   /medium-grid/@/[albumPath]
    - large-grid                          //   /large-grid/@/[albumPath]
    - carousel                            //   /carousel/@/[albumPath]
  - single raw media by path              // /media/raw/@/[path]
