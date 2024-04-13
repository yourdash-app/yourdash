/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component, ParentProps } from "solid-js";
import Navigation from "../components/navigation/navigation.js";

const RootLayout: Component<ParentProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default RootLayout;
