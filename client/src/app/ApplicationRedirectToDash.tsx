import React, { useEffect } from "react";

const ApplicationRedirectToDash: React.FC = () => {
  useEffect(() => {
    window.location.href = "#/app/a/dash";
  }, []);
  return <></>;
};

export default ApplicationRedirectToDash;
