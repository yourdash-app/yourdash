/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import TextInput from "@yourdash/uikit/components/textInput/textInput.tsx";
import NavImage from "@yourdash/uikit/views/navBar/components/navImage/navImage.tsx";
import NavTitle from "@yourdash/uikit/views/navBar/components/navTitle/navTitle.tsx";
import NavBar from "@yourdash/uikit/views/navBar/navBar.tsx";
import React from "react";
import APPLICATION_ICON from "./../../icon.avif";

const RootPage: React.FC = () => {
  return (
    <>
      <NavBar
        leftSection={
          <>
            <NavImage src={APPLICATION_ICON} />
            <NavTitle title={"YourDash Weather"} />
          </>
        }
      />
      {/* Header */}
      <div>
        <Heading
          text={"Weather"}
          level={1}
        />
        <TextInput
          accessibleName={"Location Select"}
          placeholder={"Enter location"}
        />
      </div>
      <Heading
        level={2}
        text={"Popular locations"}
      />
      <div></div>
    </>
  );
};

export default RootPage;
