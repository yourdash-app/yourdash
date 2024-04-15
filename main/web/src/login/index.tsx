/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import { Component } from "solid-js";
import isValidInstance from "./lib/isValidInstance.js";
import { useNavigate } from "@solidjs/router";

const LoginIndexPage: Component = () => {
  const navigate = useNavigate();
  const instanceUrl = csi.getInstanceUrl();

  if (!isValidInstance(instanceUrl)) {
    navigate("/login/instance");
  }

  return <>Login Page</>;
};

export default LoginIndexPage;
