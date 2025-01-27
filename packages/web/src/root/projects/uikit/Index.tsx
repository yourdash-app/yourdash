/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKFlex from "@yourdash/uikit/src/components/flex/UKFlex.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKIconButton from "@yourdash/uikit/src/components/iconButton/UKIconButton.js";
import UKSeparator from "@yourdash/uikit/src/components/separator/UKSeparator.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import { UKIcons } from "@yourdash/uikit/src/core/iconDictionary.js";
import UKPageHeader from "@yourdash/uikit/src/views/header/UKPageHeader.js";
import UKNavbarNavImage from "@yourdash/uikit/src/views/navBar/components/navImage/UKNavbarNavImage.js";
import UKNavbarNavTitle from "@yourdash/uikit/src/views/navBar/components/navTitle/UKNavbarNavTitle.js";
import UKNavBar from "@yourdash/uikit/src/views/navBar/UKNavBar.js";
import React from "react";
import { useNavigate } from "react-router";

const ProjectUiKitIndexPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <UKNavBar
        leftSection={
          <>
            <UKIconButton
              accessibleLabel={"Go Back to YourDash"}
              icon={UKIcons.YourDashLogo}
              preserveColor={true}
              onClick={() => {
                navigate("/");
              }}
            />
            <UKSeparator direction={"row"} />
            <UKNavbarNavImage src={"/assets/productLogos/yourdash.svg"} />
            <UKNavbarNavTitle title={"UIKit"} />
          </>
        }
      />
      <UKPageHeader heading={"UIKit"} />
      <UKFlex
        direction={"column"}
        padding={true}
        centerHorizontally={true}
      >
        <UKHeading
          level={2}
          text={"What is UIKit?"}
        />
        <UKText
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at culpa explicabo fugit hic inventore iusto minima, temporibus ut vero."
          }
        />
        <UKHeading
          level={2}
          text={"What is UIKit?"}
        />
        <UKText
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at culpa explicabo fugit hic inventore iusto minima, temporibus ut vero."
          }
        />
        <UKHeading
          level={2}
          text={"What is UIKit?"}
        />
        <UKText
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at culpa explicabo fugit hic inventore iusto minima, temporibus ut vero."
          }
        />
      </UKFlex>
    </div>
  );
};

export default ProjectUiKitIndexPage;
