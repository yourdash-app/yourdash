/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const HostedApplicationRouter: React.FC = () => {
  const params = useParams();
  const [hostedApplications, setHostedApplications] = useState<string[]>([]);
  const [application, setApplication] = useState<string>("");

  useEffect(() => {
    coreCSI.syncGetJson("/core/hosted-applications", (resHostedApplciations) => {
      console.log(resHostedApplciations);
      setHostedApplications(resHostedApplciations.applications);
    });
  }, []);

  useEffect(() => {
    setApplication(params["*"]!.split("/")[0]);
  }, [params["*"]]);

  if (hostedApplications.includes(application)) {
    return <>valid</>;
  }

  if (hostedApplications) return <></>;
};

export default HostedApplicationRouter;
