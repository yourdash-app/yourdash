/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import UKCard from "@yourdash/uikit/src/components/card/UKCard.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import UKImage from "@yourdash/uikit/src/components/image/UKImage.js";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import UKPageHeader from "@yourdash/uikit/src/views/header/UKPageHeader.js";
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
      <UKPageHeader heading={"Projects"} />
      <div className={styles.projectsGrid}>
        {PROJECTS.map((project) => {
          return (
            <UKCard
              className={"flex items-center justify-center flex-col gap-2"}
              onClick={() => navigate(project.link)}
            >
              <UKImage
                className={"h-24 aspect-square"}
                src={project.icon}
                accessibleLabel={""}
              />
              <UKHeading
                level={2}
                className={"font-semibold text-3xl"}
                text={project.name}
              />
              <UKText text={project.description} />
            </UKCard>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsIndexPage;
