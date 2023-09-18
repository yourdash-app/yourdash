/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { IconButton } from "web-client/src/ui";
import { useNavigate } from "react-router-dom";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

export interface IBasePageLayout {
  children: React.ReactNode,
  title: string,
  noBack?: boolean
}

const BasePageLayout: React.FC<IBasePageLayout> = ( {
  children,
  title,
  noBack
} ) => {
  const navigate = useNavigate();
  
  return (
    <main className={"flex flex-col items-center ml-auto mr-auto w-full max-w-6xl pl-4 pr-4"}>
      <section className={"flex items-center w-full gap-2 pt-8 pb-8 pl-4 pr-4 animate__animated animate__fadeIn animate__duration_250ms"}>
        {
          !noBack && (
            <IconButton
              onClick={() => {
                navigate( ".." );
              }}
              icon={YourDashIcon.ChevronLeft}
            />
          )
        }
        <h1 className={"font-bold text-container-fg text-4xl w-full text-left"}>{title}</h1>
      </section>
      <div className={"grid grid-cols-1 w-full xl:grid-cols-2 gap-2 animate__animated animate__fadeIn animate__100ms"}>
        {children}
      </div>
    </main>
  );
};

export default BasePageLayout;
