/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import Link from "@yourdash/uikit/components/link/link.js";
import { Component } from "solid-js";
import IndexPageHeroTaglines from "./components/taglines/taglines.js";
import styles from "./hero.module.scss";
import FloatingApplications from "./components/floatingApplications/floatingApplications.jsx";

const IndexPageHero: Component = () => {
  return (
    <section
      class={
        "animate__animated animate__fadeIn w-full h-[30rem] overflow-hidden relative bg-base-800 [clip-path:_polygon(0_0,_100%_0%,_100%_85%,_0%_100%);] grid lg:grid-cols-2 grid-cols-1 grid-rows-1 gap-10 pb-4"
      }
    >
      <div class={"flex flex-col items-end justify-center overflow-hidden lg:ml-0 lg:mr-0 ml-auto mr-auto"}>
        <Heading
          level={1}
          text={"YourDash"}
          extraClass={clippy("animate__jackInTheBox animate__animated animate__250ms", styles.brandName)}
        />
        {/* <h1 class={"text-6xl sm:text-8xl xs:text-7xl font-bold text-base-50  flex select-none"}>YourDash</h1> */}
        {/* Taglines scroller */}
        <IndexPageHeroTaglines />
        <div class={"flex gap-4 pt-7 items-center justify-center animate__animated animate__fadeIn animate__750ms"}>
          <Link
            to={"/login"}
            extraClass={
              "pl-4 pr-4 pb-1.5 pt-1.5 hover:bg-theme-500 active:bg-theme-400 bg-theme-600 transition-colors select-none cursor-pointer rounded-full animate__animated animate__tada animate__1s"
            }
            text={"Login"}
          />
          <Link
            to={"/login/signup"}
            extraClass={
              "hover:text-theme-500 active:text-theme-400 text-theme-200 transition-colors select-none cursor-pointer"
            }
            text={"Placeholder text"}
          />
        </div>
      </div>
      <FloatingApplications />
    </section>
  );
};

export default IndexPageHero;
