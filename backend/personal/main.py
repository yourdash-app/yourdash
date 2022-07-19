#  Copyright © 2022 Ewsgit
#  All rights reserved.
#  Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright

version = "0.0.1"

from sanic import Sanic
from sanic.response import json, text

app = Sanic("devdash_personal_server")


def main():
    print("-----------------------------")
    print("  DevDash | Personal Server  ")
    print("-----------------------------")

    print("Starting Up...")
    print(f"Detected version {version}")

    @app.get("/announce")
    async def announce_handler(request):
        with open("/etc/hostname", "r") as f:
            hostname = f.read().replace("\n", "")
            f.close()
        return json({"version": version, "status_readable": "online and fully operational", "status": "ok",
                     "description": "[description]", "hostname": hostname})

    @app.get("/status")
    async def status_handler(request):
        return text("ok")

    @app.get("/projects")
    async def get_projects(request):
        return text("work in progress")

    @app.get("/project/create")
    async def create_project(request):
        return text("work in progress")

    @app.get("/project/get")
    async def get_project(request):
        return text("work in progress")

    @app.get("/project/update")
    async def update_project(request):
        return text("work in progress")

    app.run(host="0.0.0.0", port=8359, fast=True)


main()
