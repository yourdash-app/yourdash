import Carousel from "@yourdash/uikit/views/carousel/carousel";
import React from "react";
import useResource from "@yourdash/csi/useResource.js";
import { acsi } from "../../../../meta.yourdash";
import { EndpointStoreHomePromotedApplications } from "../../../../../shared/types/endpoints/home/promotedApplications";

const PromotedApplications: React.FC = () => {
  const promotedApplications = useResource(() => acsi.getJson<EndpointStoreHomePromotedApplications>("/home/promotedApplications")) || [];

  return (
    <Carousel
      items={[<div>Hello world1</div>, <div>Hello world2</div>, <div>Hello world3</div>, <div>Hello world4</div>, <div>Hello world5</div>]}
    />
  );
};

export default PromotedApplications;
