# YourDash Applications

A central repository for all YourDash approved applications.

Note: other applications can be copied into this folder to appear in the YourDash Store for a local instance.

## Development
For first-time setup for a new application, create a `web/index.tsx` file and run `node packages/web/toolchain/generateApplicationRoutes.js`
without this, the application would not render to the web as it needs to be imported bu

## Directory Structure
```txt
applications
├── [applicationid]
│   ├── README.md
│   ├── application.json
│   ├── icon.avif
│   ?── crossCompat
│   │   └── [applicationid]
│   │       ├── web
│   │       ├── shared
│   │       ├── backend
│   │       └── assets
│   │
│   ?── web
│   │   ├── assets                   // Application's web assets
│   │   ├── i18n                     // Application's i18n translation files
│   │   │   └── en-GB.json           // Default language
│   │   ├── routes                   // Application's Routes as defined in /web/index.tsx (should map to folder structure)
│   │   │   └── index.tsx            // Application's Index page
│   │   ├── lib                      // Web client library files
│   │   ├── layout.tsx               // Application's Layout
│   │   └── routes.tsx               // React router
│   │
│   ?── backend
│   │   ├── services                 // Application's i18n translation files
│   │   │   └── en-GB.json           // Default language
│   │   ├── module                   // Application's Backend module
│   │   │   └── index.ts             // Backend module entrypoint file
│   │   ├── defaults                 // Backend's default configs and assets
│   │   └── lib                      // Backend library files
│   │
│   ?── shared                       // Structure depending on the application
│   │   ├── assets                   // Shared assets
│   │   ├── lib                      // Shared libraries
│   │   └── types                    // Shared types
│   └── tsconfig.json
│
├── package.json                     // Contains all depenedencies for applications
└── gulpfile.js                      // Executes post installation scripts for each YourDash application
```
