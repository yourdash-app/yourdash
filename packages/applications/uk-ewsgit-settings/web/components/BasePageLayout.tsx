/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Heading from "@yourdash/chiplet/components/heading/Heading";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import React from "react";

export interface IBasePageLayout {
  children: React.ReactNode;
  title: string;
  noBack?: boolean;
}

const BasePageLayout: React.FC<IBasePageLayout> = ({ children, title, noBack }) => {
  return (
    <main className={"flex flex-col items-center ml-auto mr-auto w-full max-w-6xl pl-4 pr-4 min-h-full"}>
      <section className={"flex items-center w-full gap-2 pt-8 pb-8 pl-4 pr-4 animate__animated animate__fadeIn animate__duration_250ms"}>
        {!noBack && (
          <IconButton
            onClick={() => {
              window.history.back();
            }}
            icon={UKIcons.ChevronLeft}
          />
        )}
        <Heading level={2}>{title}</Heading>
      </section>
      <div
        className={
          "grid grid-cols-1 w-full xl:grid-cols-2 gap-2 animate__animated animate__fadeIn animate__100ms h-full overflow-x-hidden overflow-y-auto auto-rows-max"
        }
      >
        {children}
      </div>
    </main>
  );
};

export default BasePageLayout;
