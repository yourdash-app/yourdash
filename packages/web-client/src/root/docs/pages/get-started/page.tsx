/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import ComingSoon from "../../../../ComingSoon";

const GetStartedPage: React.FC = () => (
  <div className={"text-center"}>
    <h1 className={"text-6xl font-semibold tracking-wide animate__animated animate__fadeIn mt-8"}>Get Started</h1>
    <p className={"animate__animated animate__fadeInDown animate__500ms mt-3"}>a quick and simple guide to getting started with YourDash</p>
    <>
      TODO: modify contents and remove coming soon
      <h3>What is YourDash?</h3>
      <p>
        YourDash is a personal cloud environment for project management, file sharing, and more
        <br/>
        Some of the features of YourDash are:
        <br/>
        File management and sharing,
        <br/>
        Project management,
        <br/>
        Version controlled file backup and sync,
        <br/>
        personal cloud code editors,
        <br/>
        fully customizable using plugins
      </p>
      <h3>Is YourDash free?</h3>
      <p>
        Yes! YourDash is free for everyone.
        <br/>
        YourDash is a free and open-source which means anyone can contribute to improve features and security.
      </p>
    </>
    <ComingSoon/>
  </div>
);

export default GetStartedPage;
