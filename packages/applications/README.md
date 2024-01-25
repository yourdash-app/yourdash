# YourDash Applications

A central repository for all YourDash approved applications.

Note: other applications can be copied into this folder to appear in the YourDash Store for a local instance.

## Development
For first-time setup for a new application, create a `frontend/index.tsx` file and run `node packages/web-client/toolchain/generateApplicationRoutes.js`
without this, the application would not render to the web-client as it needs to be imported bu

## Directory Structure

applications
├── [AppName]
│   ├── README.md
│   ├── application.json
│   ├── frontend
│   │   └── i18n // Applciation's i18n translation files
│   │   └── [AppName]Application.tsx // Application's index page
│   │   └── index.tsx // React router
│   ├── backend
│   │   └── index.ts // Core module loaded by the backend
│   ├── shared // Structure depending on the application
│   │   └── index.ts // Shared types and functions
│   └── tsconfig.json
├── package.json // Contains all depenedencies for applications
└── gulpfile.js // Executes post installation scripts for each YourDash application
