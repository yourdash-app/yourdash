/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import React from "react";
import { Link } from "react-router-dom";
import FloatingApplications from "./FloatingApplications/FloatingApplications";
import IndexPageHeroTaglines from "./Taglines";
import styles from "./Hero.module.scss";

const IndexPageHero: React.FC = () => {
  return (
    <section
      className={clippy(
        "animate__animated animate__fadeIn w-full h-[30rem] overflow-hidden relative [clip-path:_polygon(0_0,_100%_0%,_100%_85%,_0%_100%);] grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-10 pb-4",
        styles.component,
      )}
    >
      <div className={"flex flex-col items-end justify-center overflow-hidden lg:ml-0 lg:mr-0 ml-auto mr-auto"}>
        <Heading
          level={1}
          className={clippy("animate__jackInTheBox animate__animated animate__250ms", styles.brandName)}
          text={"YourDash"}
        />
        {/* Taglines scroller */}
        <IndexPageHeroTaglines />
        <div className={"flex gap-4 pt-7 items-center justify-center animate__animated animate__fadeIn animate__750ms"}>
          <Link
            to={"/login"}
            className={
              "pl-4 pr-4 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full animate__animated animate__tada animate__1s"
            }
          >
            Login
          </Link>
          <Link
            to={"/login/signup"}
            className={
              "hover:text-theme-500 active:text-theme-400 text-theme-200 transition-colors select-none cursor-pointer"
            }
          >
            Placeholder Text
          </Link>
        </div>
      </div>
      <FloatingApplications />
    </section>
  );
};

export default IndexPageHero;
