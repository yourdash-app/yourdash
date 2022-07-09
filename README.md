# The DevDash Project

The home for open-sourced development

-----

## Instructions

### How to use the application?

you can choose between the desktop client [(Download Here)](https://github.com/devdash-app/devdash/releases/) or
the [webclient](https://devdash.vercel.app)

### How to set up the personal server?

The personal server will be automatically run while you are using DevDash if you are using the desktop client.

If you are not using the desktop client or would like to set up a team server you can run the script below.

```bash
echo "coming soon"
```

[//]: # ()

[//]: # (&#40;The personal server requires to be run on linux or WSL&#41;)

[//]: # (```bash)

[//]: # (curl "https://raw.githubusercontent.com/devdash-app/devdash/meta/personal_server_setup_guide.sh" | bash)

[//]: # (```)

## Development

### Installing dependencies

```bash
meta/install_dependencies.sh
```

### Starting web client dev server

```bash
meta/start_dev_web_client.sh
```

### Starting the desktop client dev server

```bash
meta/start_dev_desktop_client.sh
```