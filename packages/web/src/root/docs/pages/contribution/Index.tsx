/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card.tsx";
import React from "react";
import { useNavigate } from "react-router";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className={"w-full flex flex-col gap-4 items-center p-4"}>
      <h1 className={"2xl:text-8xl xl:text-7xl lg:text-6xl md:text-5xl text-4xl font-bold tracking-wide transition-all text-center"}>
        {"Contribute to YourDash"}
      </h1>
      <p className={"animate__animated animate__fadeInDown animate__500ms text-center"}>
        How to setup YourDash for development or report a problem
      </p>
      <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-4 pr-4 w-full ml-auto mr-auto"}>
        {(
          [
            { label: "Report a problem", link: "/docs/contribution/report" },
            { label: "Setup development environment", link: "/docs/development/setup-env" },
            { label: "Read developer documentation", link: "/docs/development/" },
          ] as { label: string; link: string }[]
        ).map((i) => {
          return (
            <Card
              showBorder
              onClick={() => navigate(i.link)}
              className={"text-center h-32 flex items-center justify-center"}
              key={i.link}
            >
              {i.label}
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default Index;
