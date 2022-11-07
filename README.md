# YourDash - The home for your files

[description coming soon]

<!-- Collaborate on projects and sync your files easily using a yourdash instance.
yourdash instances can be easily setup within a few minutes and require a low level of maintenance while providing fast loading times. -->

## Development guide

during development you will need the latest nodejs LTS release and the yarn package manager.

### Installing dependencies

to install the client dependencies use this command in the project root folder
`
yarn
`

to install the instance / server dependencies use this command in the /server/ folder
`
yarn
`

### Starting the development servers

to start the client development server use this command in the project root folder
`
yarn dev
`

to start the instance / server development server use this command in the /server/ folder
`
yarn dev
`

## other information

YourDash is planned to be compatible with the nextcloud dav protocol. (this means that the nextcloud mobile and desktop apps should work with any yourdash server)

Eventually users will be able to load in custom css variable themes, the default theme can be found in globals.css and can be changed with css variables