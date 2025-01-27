/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";
import UKFlex from "@yourdash/uikit/src/components/flex/UKFlex.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKSeparator from "@yourdash/uikit/src/components/separator/UKSeparator.js";

const SignupPage = () => {
  return (
    <>
      <UKHeading
        level={1}
        text={"Signup with a YourDash Instance"}
      />
      <UKSeparator direction={"column"} />
      <UKFlex
        direction={"row"}
        centerHorizontally={true}
      >
        <UKFlex direction={"column"}>
          <UKHeading
            level={2}
            text={"Signup with a public instance"}
          />
          <UKButton
            text={"Signup"}
            onClick={() => {
              return 0;
            }}
          />
        </UKFlex>
        <UKSeparator
          direction={"row"}
          disableMargin={true}
        />
        <UKFlex direction={"column"}>
          <UKHeading
            level={2}
            text={"Signup with a private instance"}
          />
          <UKButton
            text={"Signup"}
            onClick={() => {
              return 0;
            }}
          />
        </UKFlex>
      </UKFlex>
    </>
  );
};

export default SignupPage;
