import React from "react";
import useResource from "@yourdash/csi/useResource.js";
import { acsi } from "../../../../meta.yourdash";
import PromotedApplication from "./promotedApplication.tsx";
import UKCarousel from "@yourdash/uikit/src/views/carousel/UKCarousel.js";

const PromotedApplications: React.FC = () => {
  const promotedApplications = useResource(() => acsi.getJson("/home/promotedApplications", "/home/promotedApplications")) || [];

  return (
    <UKCarousel
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
