/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Card } from "../../ui/index";

const PROJECTS: {
  name: string;
  icon: string;
  description: string;
  link: string;
}[] = [
  {
    name: "OpenCade Engine",
    icon: "/assets/productLogos/yourdash.svg",
    link: "https://github.com/Ewsgit/OpenCade-Engine",
    description: "A game engine designed for the web.",
  },
  {
    name: "UIKit",
    icon: "/assets/productLogos/yourdash.svg",
    link: "https://github.com/yourdash/yourdash/tree/main/packages/uikit",
    description: "The YourDash UI toolkit.",
  },
  {
    name: "Object Animator",
    icon: "/assets/productLogos/yourdash.svg",
    link: "https://github.com/Ewsgit/OpenCade",
    description: "A web animation library.",
  },
];

const ProjectsIndexPage: React.FC = () => {
  return (
    <div>
      <header className={"flex items-center justify-center h-64 bg-bg"}>
        <h1 className={"text-7xl font-black tracking-wide"}>Projects</h1>
      </header>
      <div
        className={
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 p-4 max-w-7xl ml-auto mr-auto"
        }
      >
        {PROJECTS.map((project) => {
          return (
            <Card
              showBorder={true}
              className={"flex items-center justify-center flex-col gap-2"}
              onClick={() => window.open(project.link, "_blank")}
            >
              <img
                className={"h-24 aspect-square"}
                src={project.icon}
                alt={""}
              />
              <span className={"font-semibold text-3xl"}>{project.name}</span>
              <p>{project.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsIndexPage;
