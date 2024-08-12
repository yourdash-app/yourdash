/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
import type { IWidgetGrid } from "../shared/types/widgetGrid.js";
import core from "@yourdash/backend/src/core/core.js";

export default class DashModule extends YourDashBackendModule {
  constructor(args: YourDashModuleArguments) {
    super(args);
  }

  public loadEndpoints() {
    super.loadEndpoints();

    core.request.setNamespace("app/uk-ewsgit-dash");

    core.request.get("/user-full-name", async (req, res) => {
      res.json(
        (await core.users.get(req.username).getName()) || {
          first: "Unknown",
          last: "User",
        },
      );
    });

    const WIDGET_PAGES: IWidgetGrid[] = [
      {
        widgets: [
          {
            position: {
              x: 1,
              y: 0,
            },
            id: "applicationShortcut",
            size: {
              preferred: {
                width: 2,
                height: 2,
              },
              min: {
                width: 1,
                height: 1,
              },
              max: {
                width: 2,
                height: 3,
              },
            },
            data: {
              id: "uk-ewsgit-dash-frontend",
              url: "https://ewsgit.uk",
              name: "YourDash",
              icon: "https://ewsgit.uk/favicon.png",
            },
          },
          {
            position: {
              x: 2,
              y: 0,
            },
            id: "applicationShortcut",
            size: {
              preferred: {
                width: 2,
                height: 2,
              },
              min: {
                width: 1,
                height: 1,
              },
              max: {
                width: 2,
                height: 3,
              },
            },
            data: {},
          },
          {
            position: {
              x: 0,
              y: 2,
            },
            id: "applicationShortcut",
            size: {
              preferred: {
                width: 2,
                height: 2,
              },
              min: {
                width: 1,
                height: 1,
              },
              max: {
                width: 2,
                height: 3,
              },
            },
            data: {},
          },
          {
            position: {
              x: 0,
              y: 4,
            },
            id: "applicationShortcut",
            size: {
              preferred: {
                width: 2,
                height: 2,
              },
              min: {
                width: 1,
                height: 1,
              },
              max: {
                width: 2,
                height: 3,
              },
            },
            data: {},
          },
          {
            position: {
              x: 2,
              y: 2,
            },
            id: "applicationShortcut",
            size: {
              preferred: {
                width: 2,
                height: 2,
              },
              min: {
                width: 1,
                height: 1,
              },
              max: {
                width: 2,
                height: 3,
              },
            },
            data: {},
          },
        ],
      },
    ];

    core.request.get("/widget/pages", async (req, res) => {
      // return the number of widget pages a user has

      return res.json({
        pageCount: WIDGET_PAGES.length,
      });
    });

    core.request.get("/widgets/:page", async (req, res) => {
      const page = req.params.page as string;

      res.json(WIDGET_PAGES[Number(page)] satisfies IWidgetGrid);
    });
  }
}
