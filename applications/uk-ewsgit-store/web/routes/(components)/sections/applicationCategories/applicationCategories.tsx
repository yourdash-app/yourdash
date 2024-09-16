/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import useResource from "@yourdash/csi/useResource.ts";
import Card from "@yourdash/uikit/components/card/card.tsx";
import React from "react";
import EndpointHomeApplicationCategories from "../../../../../shared/types/endpoints/home/applicationCategories.ts";
import { acsi } from "../../../../meta.yourdash.ts";

const ApplicationCategories: React.FC = () => {
  const categories = useResource(() => acsi.getJson<EndpointHomeApplicationCategories>("/home/applicationCategories")) || [];

  return (
    <>
      {categories.map((cat) => {
        return <Card>This is a sample category {cat.id}</Card>;
      })}
    </>
  );
};

export default ApplicationCategories;
