import generateUUID from "@yourdash/shared/web/helpers/uuid";
import Carousel from "@yourdash/uikit/views/carousel/carousel";
import React from "react";
import useResource from "@yourdash/csi/useResource.js";
import { acsi } from "../../../../meta.yourdash";
import { EndpointStoreHomePromotedApplications } from "../../../../../shared/types/endpoints/home/promotedApplications";

const PromotedApplications: React.FC = () => {
  const promotedApplications = useResource(() => acsi.getJson<EndpointStoreHomePromotedApplications>("/home/promotedApplications")) || [];

  return (
    <Carousel
      items={[
        { element: <div>Hello world1</div>, id: generateUUID() },
        { element: <div>Hello world2</div>, id: generateUUID() },
        { element: <div>Hello world3</div>, id: generateUUID() },
        { element: <div>Hello world4</div>, id: generateUUID() },
        { element: <div>Hello world5</div>, id: generateUUID() },
      ]}
    />
  );
};

export default PromotedApplications;
