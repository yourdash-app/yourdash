/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card";
import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "packages/uikit/src/core/iconDictionary.ts";
import React from "react";
import StatusIndicators from "./components/StatusIndicators/StatusIndicators";

const HomeView: React.FC = () => {
  return (
    <div className={"@container"}>
      <section className={"grid grid-cols-1 @6xl:grid-cols-2 gap-4"}>
        <section className={"flex flex-col gap-4"}>
          <Card
            className={"flex gap-2 flex-row items-center"}
            showBorder
          >
            <Icon
              className={"aspect-square h-12"}
              icon={UKIcons.YourDashLogo}
              preserveColor
            />
            <h1 className={"text-3xl font-bold tracking-wide"}>{"YourDash Dev"}</h1>
            <StatusIndicators />
          </Card>
          <Card
            className={"h-full"}
            showBorder
          >
            Requests log
          </Card>
        </section>
        <section className={"flex flex-col gap-4"}>
          <Card
            className={"h-full"}
            showBorder
          >
            <h2 className={"font-semibold text-3xl tracking-wide"}>Console</h2>
          </Card>
        </section>
      </section>
    </div>
  );
};

export default HomeView;
