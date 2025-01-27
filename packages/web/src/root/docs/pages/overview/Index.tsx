/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card.tsx";
import MajorButton from "@yourdash/chiplet/components/majorButton/MajorButton.tsx";
import React from "react";
import { useNavigate } from "react-router";

const OverviewPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={"text-center"}>
      <h1 className={"text-6xl font-semibold tracking-wide animate__animated animate__fadeIn mt-8"}>Overview</h1>
      <p className={"animate__animated animate__fadeInDown animate__500ms mt-3"}>a quick and simple guide to the YourDash documentation</p>

      <section className={"grid grid-cols-2 gap-2 max-w-5xl ml-auto mr-auto p-4"}>
        {(
          [
            {
              name: "FAQ",
              link: "/docs/faq",
            },
            {
              name: "Get Started",
              link: "/docs/get-started",
            },
            {
              name: "Translation",
              link: "/docs/translation",
            },
            {
              name: "Contribute",
              link: "/docs/contribution",
            },
          ] as { name: string; link: string }[]
        ).map((obj) => {
          return (
            <Card
              key={obj.name}
              onClick={() => navigate(obj.link)}
            >
              {obj.name}
            </Card>
          );
        })}
      </section>

      <footer className={"w-full flex max-w-screen-2xl"}>
        <MajorButton className={"ml-auto"}>{"Next page"}</MajorButton>
      </footer>
    </div>
  );
};

export default OverviewPage;
