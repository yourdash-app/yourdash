/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card";
import * as React from "react";

const StartupView: React.FC = () => {
  return (
    <main className={"grid grid-cols-3 gap-2"}>
      <header
        className={"col-span-3 h-96 flex items-center md:pl-24 justify-center md:justify-normal bg-cover bg-center"}
        style={{ backgroundImage: "url(/assets/background.jpg)" }}
      >
        <div className={"flex flex-col gap-1"}>
          <h1
            className={"text-6xl font-black tracking-wide [text-shadow:#242424bb_0_0_0.75rem,_#24242488_0_0_0.5rem,_#24242444_0_0_0.25rem]"}
          >
            Flowey
          </h1>
          <span className={"[text-shadow:#242424bb_0_0_0.75rem,_#24242488_0_0_0.5rem,_#24242444_0_0_0.25rem] font-semibold tracking-wide"}>
            Flowchart and block-out tool
          </span>
          (Placeholder background)
        </div>
      </header>
      <div className={"flex flex-col col-span-2 ml-4 gap-2"}>
        <Card
          showBorder
          onClick={() => {
            console.log("Clicked!");
          }}
        >
          Create Flow
        </Card>
        <Card
          showBorder
          onClick={() => {
            console.log("Clicked!");
          }}
        >
          Open Flow
        </Card>
      </div>
      <Card
        showBorder
        className={"flex flex-col col-span-1 mr-4"}
      >
        <h2>Recent Flows</h2>
        <div>Flow1</div>
        <div>Flow2</div>
        <div>Flow3</div>
        <div>Flow4</div>
        <div>Flow5</div>
        <div>Flow6</div>
        <div>Flow7</div>
      </Card>
    </main>
  );
};

export default StartupView;
