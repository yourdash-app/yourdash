/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Flex from "@yourdash/uikit/src/components/flex/flex.tsx";
import Heading from "@yourdash/uikit/src/components/heading/heading.tsx";
import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary.ts";
import IconButton from "@yourdash/uikit/src/components/iconButton/iconButton.tsx";
import Separator from "@yourdash/uikit/src/components/separator/separator.tsx";
import Text from "@yourdash/uikit/src/components/text/text.tsx";
import Header from "@yourdash/uikit/src/views/header/header.tsx";
import NavImage from "@yourdash/uikit/src/views/navBar/components/navImage/navImage.tsx";
import NavTitle from "@yourdash/uikit/src/views/navBar/components/navTitle/navTitle.tsx";
import NavBar from "@yourdash/uikit/src/views/navBar/navBar.tsx";
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
        <Text
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at culpa explicabo fugit hic inventore iusto minima, temporibus ut vero."
          }
        />
        <Heading
          level={2}
          text={"What is UIKit?"}
        />
        <Text
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at culpa explicabo fugit hic inventore iusto minima, temporibus ut vero."
          }
        />
        <Heading
          level={2}
          text={"What is UIKit?"}
        />
        <Text
          text={
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at culpa explicabo fugit hic inventore iusto minima, temporibus ut vero."
          }
        />
      </Flex>
    </div>
  );
};

export default ProjectUiKitIndexPage;
