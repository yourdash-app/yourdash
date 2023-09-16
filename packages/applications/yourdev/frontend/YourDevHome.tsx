/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Card, Icon, IconButton } from "web-client/src/ui";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const YourDevHome: React.FC = () => (
  <div className={"grid grid-cols-2 h-full overflow-hidden gap-4 p-4 bg-bg"}>
    <section className={"flex flex-col gap-4"}>
      <Card className={"flex gap-2 flex-row items-center"} showBorder>
        <Icon className={"aspect-square h-12"} icon={YourDashIcon.YourDashLogo} useDefaultColor/>
        <h1 className={"text-3xl font-bold tracking-wide"}>{"YourDev / Home"}</h1>
        <div className={"ml-auto flex gap-2 items-center"}>
          <div className={"flex flex-col gap-1 items-center justify-center"}>
            <IconButton icon={YourDashIcon.Plug}/>
            <span>{"20"}</span>
          </div>
          <div className={"flex flex-col gap-1 items-center justify-center"}>
            <IconButton icon={YourDashIcon.Info} color={"#32b3ff"}/>
            <span>{"200"}</span>
          </div>
          <div className={"flex flex-col gap-1 items-center justify-center"}>
            <IconButton icon={YourDashIcon.Alert} color={"#eeff33"}/>
            <span>{"4"}</span>
          </div>
          <div className={"flex flex-col gap-1 items-center justify-center"}>
            <IconButton icon={YourDashIcon.XCircle} color={"#ff6633"}/>
            <span>{"1"}</span>
          </div>
        </div>
      </Card>
      <Card className={"h-full"} showBorder>
        Requests log
      </Card>
    </section>
    <section className={"flex flex-col gap-4"}>
      <Card className={"h-full"} showBorder>
        <h2 className={"font-semibold text-3xl tracking-wide"}>
          Console
        </h2>
      </Card>
    </section>
  </div>
);

export default YourDevHome;
