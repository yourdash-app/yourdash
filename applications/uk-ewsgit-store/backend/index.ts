/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import core from "@yourdash/backend/src/core/core.js";
import { YourDashBackendModule, YourDashModuleArguments } from "@yourdash/backend/src/core/coreApplicationManager.js";
import randomIndexOf from "@yourdash/shared/lib/randomIndexOf.js";
import EndpointHomeApplicationCategories from "../shared/types/endpoints/home/applicationCategories.js";
import { EndpointStoreHomePromotedApplications } from "../shared/types/endpoints/home/promotedApplications.js";
import { EndpointStoreHomeCategoryCategoryId } from "./../shared/types/endpoints/home/category/categoryId.js";
import { EndpointStoreHomeApplicationApplicationId } from "../shared/types/endpoints/home/application/applicationId.js";

export default class StoreModule extends YourDashBackendModule {
  private applicationCategories: { [categoryId: string]: { applications: string[]; modules: string[]; displayName: string; id: string } };

  constructor(args: YourDashModuleArguments) {
    super(args);

    this.applicationCategories = {};

    return this;
  }

  public loadEndpoints() {
    super.loadEndpoints();

    core.request.setNamespace(`app/${this.api.moduleId}`);

    core.request.get("/home/promotedApplications", async (req, res) => {
      return res.json([
        {
          displayName: "displayName",
          bannerBackground: "bannerBackground",
          developer: "developer inc",
          icon: "/assets/productLogos/yourdash.svg",
          id: "com-example-test",
          tags: ["development", "stupidity"],
          description: "Hello world from application description",
        },
        {
          displayName: "displayName2",
          bannerBackground: "bannerBackground",
          developer: "developer inc",
          icon: "/assets/productLogos/yourdash.svg",
          id: "com-example-test2",
          tags: ["development", "stupidity"],
          description: "Hello world from application description2",
        },
        {
          displayName: "displayName3",
          bannerBackground: "bannerBackground",
          developer: "developer inc",
          icon: "/assets/productLogos/yourdash.svg",
          id: "com-example-test3",
          tags: ["development", "stupidity"],
          description: "Hello world from application description3",
        },
        {
          displayName: "displayName4",
          bannerBackground: "bannerBackground",
          developer: "developer inc",
          icon: "/assets/productLogos/yourdash.svg",
          id: "com-example-test4",
          tags: ["development", "stupidity"],
          description: "Hello world from application description4",
        },
        {
          displayName: "displayName5",
          bannerBackground: "bannerBackground",
          developer: "developer inc",
          icon: "/assets/productLogos/yourdash.svg",
          id: "com-example-test5",
          tags: ["development", "stupidity"],
          description: "Hello world from application description5",
        },
      ] satisfies EndpointStoreHomePromotedApplications);
    });

    core.request.get("/home/applicationCategories", async (req, res) => {
      const categories = Object.entries(this.applicationCategories);
      // array of random css background images
      const backgrounds: string[] = ["orange"];

      return res.json([
        {
          id: "categoryId",
          displayName: "Category Display Name",
          description: "This is the categoryDescription",
          moduleCount: 69,
          applicationCount: 69,
          backgroundImage: randomIndexOf(backgrounds),
        },
      ] satisfies EndpointHomeApplicationCategories);
    });

    core.request.get("/home/category/:categoryId", async (req, res) => {
      const categoryId = req.params.categoryId;

      if (!this.applicationCategories[categoryId]) return res.status(404).json({ error: "Unknown category" });

      return res.json({
        applications: this.applicationCategories[categoryId].applications,
        displayName: this.applicationCategories[categoryId].displayName,
      } satisfies EndpointStoreHomeCategoryCategoryId);
    });

    core.request.get("/home/application/:applicationId", async (req, res) => {
      const applicationId = req.params.applicationId;

      return res.json({
        description: "Sample application description",
        displayName: "Sample Display Name",
        developer: "ewsgit.uk",
        id: applicationId,
        moduleCount: 2,
      } satisfies EndpointStoreHomeApplicationApplicationId);
    });
  }
}
