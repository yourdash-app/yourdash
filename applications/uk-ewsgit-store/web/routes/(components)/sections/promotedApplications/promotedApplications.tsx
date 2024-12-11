import { Carousel } from "@yourdash/uikit/views/index";
import React from "react";
import useResource from "@yourdash/csi/useResource.js";
import { acsi } from "../../../../meta.yourdash";
import { EndpointStoreHomePromotedApplications } from "../../../../../shared/types/endpoints/home/promotedApplications";
import PromotedApplication from "./promotedApplication.tsx";

const PromotedApplications: React.FC = () => {
  const promotedApplications = useResource(() => acsi.getJson("/home/promotedApplications", "/home/promotedApplications")) || [];

  return (
    <Carousel
      items={promotedApplications.map((app) => {
        return {
          id: app.id,
          element: (
            <PromotedApplication
              key={app.id}
              application={app}
            />
          ),
        };
      })}
    />
  );
};

export default PromotedApplications;
