/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import KeyPointsCard from "./components/content/KeyPointsCard.tsx";
import IndexPageHero from "./components/Hero/Hero.tsx";
import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <IndexPageHero />
      <section className={"max-w-6xl ml-auto mr-auto grid xl:grid-cols-3 gap-2 grid-cols-2 pb-12"}>
        <section
          className={"lg:flex-row flex-col pt-8 flex lg:justify-between items-center gap-4 w-full pl-8 pr-8 mb-10 xl:col-span-3 col-span-2"}
        >
          <h3 className={"text-7xl lg:text-left text-center font-black animate__animated animate__fadeInLeft animate__500ms animate__slow"}>
            {"Host your own"}
          </h3>
          <div
            className={
              "flex lg:items-end items-center gap-4 flex-col animate__animated animate__fadeInRight animate__500ms animate__slow relative"
            }
          >
            <span className={"lg:w-72 lg:text-right text-center text-2xl"}>
              {"Run a single command and be up-and-running within minutes"}
              <span className={"text-base font-thin text-gray-300"}>*</span>
            </span>
            <UKButton
              text={"Get started"}
              onClick={() => {
                navigate("/docs/faq");
              }}
            />
            <span className={"text-xs text-gray-400 absolute top-full mt-2"}>*{" Only on supported devices."}</span>
          </div>
        </section>
      </section>
      {/* Key Points Cards */}
      <section className={"w-full p-4 pt-0 pb-0 gap-2 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 grid mb-4 max-w-6xl ml-auto mr-auto"}>
        <KeyPointsCard
          title={"Limitless personalisation"}
          content={"Download and create themes and plugins with ease"}
          action={{
            label: "Learn more",
            onClick: () => {
              navigate("/docs/faq");
            },
          }}
        />
        <KeyPointsCard
          title={"Open sourced"}
          content={"See how YourDash works and help improve it for everyone"}
          action={{
            label: "Learn more",
            onClick: () => {
              navigate("/docs/faq");
            },
          }}
        />
        <KeyPointsCard
          title={"Projects"}
          content={"Checkout some other YourDash projects"}
          action={{
            label: "Learn more",
            onClick: () => {
              navigate("/projects");
            },
          }}
        />
      </section>
    </>
  );
};

export default Index;
