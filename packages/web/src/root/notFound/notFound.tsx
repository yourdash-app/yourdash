/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import Separator from "@yourdash/uikit/components/separator/separator.tsx";
import Subtext from "@yourdash/uikit/components/subtext/subtext.tsx";
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div
      className={"text-center flex items-center justify-center flex-col h-max pt-20 pb-20 pr-10 pl-10 animate__animated animate__fadeIn"}
    >
      <Heading
        className={"!text-7xl pb-4 animate__animated animate__jackInTheBox"}
        level={1}
        text={"404"}
      />
      <Separator direction={"column"} />
      <Subtext
        className={"animate__animated animate__fadeInUp"}
        text={"This page could not be found!"}
      />
    </div>
  );
};

export default NotFoundPage;
