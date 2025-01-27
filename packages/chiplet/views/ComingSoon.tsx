/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Link } from "react-router-dom";

const ComingSoon: React.FC = () => {
  return (
    <div className={"min-h-full w-full text-base-50 flex items-center justify-center text-5xl font-bold tracking-wide flex-col gap-4"}>
      <span>Coming soon...</span>
      <Link
        hideLinkIcon={true}
        to={"/"}
        className={
          "pl-8 pr-8 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full text-xl font-normal tracking-normal"
        }
      >
        Home
      </Link>
    </div>
  );
};

export default ComingSoon;
