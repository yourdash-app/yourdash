/*
 * Copyright ©2022-2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Card, Icon } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const HowToHelp: React.FC = () => (
  <main className={"w-full flex flex-col gap-4"}>
    <section className={"w-full bg-container-bg text-container-fg pb-32 pt-32 text-center"}>
      <h1 className={"text-7xl font-bold tracking-wide"}>{"Some ways you can help"}</h1>
    </section>
    <div className={"grid grid-cols-3 gap-2 pl-4 pr-4 max-w-[96rem] ml-auto mr-auto h-72"}>
      <Card onClick={() => 0}>
        <h2>
          {"Suggest new features"}
        </h2>
        <p>
          {"Add new features / improve existing ones"}
        </p>
        <Icon className={"ml-auto mt-auto h-8"} icon={YourDashIcon.Link}/>
      </Card>
      <Card onClick={() => 0}>
        <h2>
          {"report bugs"}
        </h2>
        <p>
          {"Help improve reliability or fix something unexpected"}
        </p>
        <Icon className={"ml-auto mt-auto h-8"} icon={YourDashIcon.Link}/>
      </Card>
      <Card onClick={() => 0}>
        <h2>
          {"Improve translations and documentation"}
        </h2>
        <p>
          {"Help make YourDash inclusive for all"}
        </p>
        <Icon className={"ml-auto mt-auto h-8"} icon={YourDashIcon.Link}/>
      </Card>
    </div>
  </main>
);

export default HowToHelp;
