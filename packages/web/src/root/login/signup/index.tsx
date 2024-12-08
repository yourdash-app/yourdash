/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { UKC } from "@yourdash/uikit";

const SignupPage = () => {
  return (
    <>
      <UKC.Heading
        level={1}
        text={"Signup with a YourDash Instance"}
      />
      <UKC.Separator direction={"column"} />
      <UKC.Flex
        direction={"row"}
        centerHorizontally={true}
      >
        <UKC.Flex direction={"column"}>
          <UKC.Heading
            level={2}
            text={"Signup with a public instance"}
          />
          <UKC.Button
            text={"Signup"}
            onClick={() => {
              return 0;
            }}
          />
        </UKC.Flex>
        <UKC.Separator
          direction={"row"}
          disableMargin={true}
        />
        <UKC.Flex direction={"column"}>
          <UKC.Heading
            level={2}
            text={"Signup with a private instance"}
          />
          <UKC.Button
            text={"Signup"}
            onClick={() => {
              return 0;
            }}
          />
        </UKC.Flex>
      </UKC.Flex>
    </>
  );
};

export default SignupPage;
