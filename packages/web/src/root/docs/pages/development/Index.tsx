/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card.tsx";
import React from "react";
import { useNavigate } from "react-router";

const FAQPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={"flex flex-col text-center gap-4"}>
      <h3 className={"text-6xl font-semibold tracking-wide animate__animated animate__fadeIn mt-8"}>What is YourDash?</h3>
      <p className={"animate__animated animate__fadeInDown animate__500ms -mt-1"}>
        YourDash is a personal cloud environment for project management, file sharing, and more
      </p>
      <ul className={"list-disc w-max ml-auto mr-auto text-left animate__animated animate__fadeIn"}>
        <li>Some of the features of YourDash are:</li>
        <li>File management and sharing,</li>
        <li>Project management,</li>
        <li>Version controlled file backup and sync,</li>
        <li>personal cloud code editors,</li>
        <li>fully customizable using plugins</li>
      </ul>
      <section>
        TODO: implement an acordion in Chiplet
        <h3>Is YourDash free?</h3>
        <p>
          Yes! YourDash is free to use for everyone. See [installation instructions](/docs/get-started)
          <br />
          YourDash is free and open-source which means anyone can contribute to collectively improve features and security.
        </p>
      </section>

      <section className={"p-4 gap-2 flex flex-col items-center justify-center w-full"}>
        <h2 className={"text-4xl font-semibold tracking-wide animate__animated animate__fadeIn mt-4"}>UI Libraries</h2>
        <p className={"animate__animated animate__fadeInDown animate__500ms -mt-1"}>YourDash uses two main UI Libraries</p>

        <div className={"grid lg:grid-cols-2 gap-2 grid-cols-1"}>
          <Card
            className={"gap-2 flex flex-col"}
            showBorder
            onClick={() => {
              navigate("/docs/development/chiplet");
            }}
          >
            <h3 className={"text-3xl font-semibold tracking-wide animate__animated animate__fadeIn"}>Chiplet</h3>
            <p className={"animate__animated animate__fadeInDown animate__500ms -mt-1"}>(deprecation in progress UI Library)</p>
            <p>Based on React.JS and Tailwind.css</p>
          </Card>
          <Card
            className={"gap-2 flex flex-col"}
            showBorder
            onClick={() => {
              navigate("/docs/development/chiplet");
            }}
          >
            <h3 className={"text-3xl font-semibold tracking-wide animate__animated animate__fadeIn"}>UIKit</h3>
            <p className={"animate__animated animate__fadeInDown animate__500ms -mt-1"}>(current UI Library)</p>
            <p>Based on React.JS with theme support</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
