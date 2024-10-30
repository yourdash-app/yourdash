/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/src/components/card/card.tsx";
import Heading from "@yourdash/uikit/src/components/heading/heading.tsx";
import Image from "@yourdash/uikit/src/components/image/image.tsx";
import Text from "@yourdash/uikit/src/components/text/text.tsx";
import Header from "@yourdash/uikit/src/views/header/header.tsx";
import React from "react";
import { useNavigate } from "react-router";
import styles from "./Index.module.scss";

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
      <Header heading={"Projects"} />
      <div className={styles.projectsGrid}>
        {PROJECTS.map((project) => {
          return (
            <Card
              className={"flex items-center justify-center flex-col gap-2"}
              onClick={() => navigate(project.link)}
            >
              <Image
                className={"h-24 aspect-square"}
                src={project.icon}
                accessibleLabel={""}
              />
              <Heading
                level={2}
                className={"font-semibold text-3xl"}
                text={project.name}
              />
              <Text text={project.description} />
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsIndexPage;
