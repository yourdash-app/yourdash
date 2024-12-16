/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Flex, Heading, IconButton, Separator, UKText } from "@yourdash/uikit/components/index";
import { UKIcon } from "@yourdash/uikit/core/index";
import { Header, NavBar, NavImage, NavTitle } from "@yourdash/uikit/views/index";
import React from "react";
import { useNavigate } from "react-router";

const ProjectUiKitIndexPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NavBar
        leftSection={
          <>
            <IconButton
              accessibleLabel={"Go Back to YourDash"}
              icon={UKIcon.YourDashLogo}
              preserveColor={true}
              onClick={() => {
                navigate("/");
              }}
            />
            <Separator direction={"row"} />
            <NavImage src={"/assets/productLogos/yourdash.svg"} />
            <NavTitle title={"UIKit"} />
          </>
        }
      />
      <Header heading={"UIKit"} />
      <Flex
        direction={"column"}
        padding={true}
        centerHorizontally={true}
      >
        <Heading
          level={2}
          text={"What is UIKit?"}
        />
        <UKText
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at culpa explicabo fugit hic inventore iusto minima, temporibus ut vero."
          }
        />
        <Heading
          level={2}
          text={"What is UIKit?"}
        />
        <UKText
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at culpa explicabo fugit hic inventore iusto minima, temporibus ut vero."
          }
        />
        <Heading
          level={2}
          text={"What is UIKit?"}
        />
        <UKText
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at culpa explicabo fugit hic inventore iusto minima, temporibus ut vero."
          }
        />
      </Flex>
    </div>
  );
};

export default ProjectUiKitIndexPage;
