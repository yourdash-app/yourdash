import React from "react";
import useTranslate from "../../../../../helpers/l10n";

export interface IDashboard {
  username: string,
  fullName: {
    first: string,
    last: string
  }
}

const DashboardLayout: React.FC<IDashboard> = ({
  username,
  fullName
}) => {
  const trans = useTranslate("dash");
  return (
    <main className={"flex flex-col w-full min-h-full"}/>
  );
};

export default DashboardLayout;
