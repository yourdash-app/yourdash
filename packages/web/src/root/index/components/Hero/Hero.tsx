/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKButtonLink from "@yourdash/uikit/src/components/buttonLink/UKButtonLink.js";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import React from "react";
import FloatingApplications from "./FloatingApplications/FloatingApplications.tsx";
import IndexPageHeroTaglines from "./Taglines.tsx";
import styles from "./Hero.module.scss";

const IndexPageHero: React.FC = () => {
  return (
    <section
      className={clippy(
        "animate__animated animate__fadeIn w-full h-[30rem] overflow-hidden relative [clip-path:_polygon(0_0,_100%_0%,_100%_85%,_0%_100%);] grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-10 pb-4 drop-shadow-xl",
        styles.component,
      )}
    >
      <div className={"flex flex-col items-end justify-center overflow-hidden lg:ml-0 lg:mr-0 ml-auto mr-auto"}>
        <UKHeading
          level={1}
          className={clippy("animate__jackInTheBox animate__animated animate__250ms", styles.brandName)}
          text={"YourDash"}
        />
        {/* Taglines scroller */}
        <IndexPageHeroTaglines />
        <div className={"flex gap-2 pt-7 justify-end animate__animated animate__fadeIn animate__750ms"}>
          <UKButtonLink
            to={"/login"}
            text={"Login"}
          />
          <UKButtonLink
            to={"/login/signup"}
            text={"Signup"}
          />
        </div>
      </div>
      <FloatingApplications />
    </section>
  );
};

export default IndexPageHero;
