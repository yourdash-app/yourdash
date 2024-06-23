/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import csi from "@yourdash/csi/csi";
import useResource from "@yourdash/csi/useResource";
import Flex from "@yourdash/uikit/components/flex/flex";
import Heading from "@yourdash/uikit/components/heading/heading";
import React from "react";

const DashAppliation: React.FC = () => {
  const username = useResource(() => csi.getUser().getFullName());

  return (
    <Flex direction={"column"}>
      <Flex direction={"row"}>
        <Heading
          text={`Hiya, ${username?.first}`}
          level={1}
        />
      </Flex>
    </Flex>
  );
};

export default DashAppliation;
