import React from "react";
import ComingSoon from "../../../../ComingSoon";

const GetStartedPage: React.FC = () => (
  <div className={"text-center"}>
    <h1 className={"text-6xl font-semibold tracking-wide animate__animated animate__fadeIn mt-8"}>Get Started</h1>
    <p className={"animate__animated animate__fadeInDown animate__500ms mt-3"}>a quick and simple guide to getting started with YourDash</p>
    <ComingSoon/>
  </div>
);

export default GetStartedPage;
