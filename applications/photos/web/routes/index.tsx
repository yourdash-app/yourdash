/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Button from "@yourdash/uikit/components/button/button.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import useToast from "@yourdash/uikit/core/toast.js";

function IndexRoute() {
  const toast = useToast();

  return (
    <>
      <Heading
        level={1}
        text={"Root Path"}
      />
      <Button
        text={"Toast Demo"}
        onClick={() => {
          toast.create({ type: "info", content: "Toast Success" });
        }}
      />
    </>
  );
}

export default IndexRoute;
