/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Button from "@yourdash/uikit/components/button/button.tsx";
import Card from "@yourdash/uikit/components/card/card.tsx";
import Flex from "@yourdash/uikit/components/flex/flex.tsx";
import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import Separator from "@yourdash/uikit/components/separator/separator.tsx";

const SignupPage = () => {
  return (
    <>
      <Heading
        level={1}
        text={"Signup with a YourDash Instance"}
      />
      <Separator direction={"column"} />
      <Flex
        direction={"row"}
        centerHorizontally={true}
      >
        <Flex direction={"column"}>
          <Heading
            level={2}
            text={"Signup with a public instance"}
          />
          <Button
            text={"Signup"}
            onClick={() => {
              return 0;
            }}
          />
        </Flex>
        <Separator
          direction={"row"}
          disableMargin={true}
        />
        <Flex direction={"column"}>
          <Heading
            level={2}
            text={"Signup with a private instance"}
          />
          <Button
            text={"Signup"}
            onClick={() => {
              return 0;
            }}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default SignupPage;
