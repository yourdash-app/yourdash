/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";

const RootLayout: React.FC = () => {
  return <main className={"h-screen overflow-y-auto overflow-x-hidden relative bg-[rgb(var(--base-900))]"}>
    <Header />
    <Outlet />
  </main>;
};

export default RootLayout;