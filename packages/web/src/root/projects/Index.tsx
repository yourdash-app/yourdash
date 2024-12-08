/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useNavigate } from "react-router";
import styles from "./Index.module.scss";
import { UKC, UKV } from "@yourdash/uikit";

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
    link: "/projects/uikit",
    description: "The YourDash UI toolkit.",
  },
];

const ProjectsIndexPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <UKV.Header heading={"Projects"} />
      <div className={styles.projectsGrid}>
        {PROJECTS.map((project) => {
          return (
            <UKC.Card
              className={"flex items-center justify-center flex-col gap-2"}
              onClick={() => navigate(project.link)}
            >
              <UKC.Image
                className={"h-24 aspect-square"}
                src={project.icon}
                accessibleLabel={""}
              />
              <UKC.Heading
                level={2}
                className={"font-semibold text-3xl"}
                text={project.name}
              />
              <UKC.Text text={project.description} />
            </UKC.Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsIndexPage;
