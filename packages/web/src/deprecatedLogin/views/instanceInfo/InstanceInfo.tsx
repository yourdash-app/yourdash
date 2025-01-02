/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect, useState } from "react";
import useYourDashLib from "@yourdash/shared/web/helpers/ydsh.ts";
import coreCSI from "@yourdash/csi/coreCSI.ts";

const InstanceInfo: React.FC = () => {
  const [metadata, setMetadata] = useState<{ title: string; message: string }>({
    title: "",
    message: "",
  });
  const ydsh = useYourDashLib();

  useEffect(() => {
    coreCSI.syncGetJson(
      "/login/instance/metadata",
      {},
      (json: { title: string; message: string }) => {
        setMetadata(json);
      },
      () => {
        ydsh.toast.error("Login Error", "This instance is not available");
      },
    );
  }, []);

  if (metadata.title === "" && metadata.message === "") {
    return (
      <div className={"flex items-center justify-center h-full w-full"}>
        <span className={"text-4xl font-bold"}>Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={"flex flex-col w-[calc(100%+2rem)] h-[calc(100%+2rem)] bg-cover bg-center -ml-4 -mt-4"}
      style={{
        backgroundImage: `url(${coreCSI.getInstanceUrl()}/login/instance/background)`,
      }}
    >
      <section className={"flex flex-col mt-auto w-full h-max pl-4 pr-4 pb-2 pt-32 from-base-800 to-transparent bg-gradient-to-t"}>
        <h2 className={"font-bold text-5xl text-container-fg w-full whitespace-normal text-ellipsis"}>{metadata.title}</h2>
        <p className={"whitespace-normal overflow-hidden text-ellipsis w-full text-container-secondary-fg"}>{metadata.message}</p>
        <span className={"text-sm font-light text-right"}>{coreCSI.getInstanceUrl()}</span>
      </section>
    </div>
  );
};

export default InstanceInfo;
