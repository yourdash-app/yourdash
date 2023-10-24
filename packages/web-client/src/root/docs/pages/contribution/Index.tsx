/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useNavigate } from "react-router";
import { Card, Icon } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const Index: React.FC = () => {
  const navigate = useNavigate()
  
  return (
    <main className={ "w-full flex flex-col gap-4 items-center" }>
      <h1 className={ "text-7xl font-bold tracking-wide" }>{ "Contribute to YourDash" }</h1>
      <p>How to setup YourDash for development or report a problem</p>
      <div className={ "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-4 pr-4 w-full ml-auto mr-auto" }>
        {
          (
            [
              { label: "Report a problem", link: "/docs/contribution/report" },
              { label: "Setup development environment", link: "/docs/development/setup-env" },
              { label: "Read developer documentation", link: "/docs/development/" },
            ] as { label: string, link: string }[]
          ).map( i => {
            return <Card
              showBorder
              onClick={ () => navigate( i.link ) }
              className={"text-center"}
              key={i.link}
            >
              { i.label }
            </Card>;
          } )
        }
      </div>
    </main>
  );
};

export default Index;
