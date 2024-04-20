/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import { Component, createSignal } from "solid-js";
import isValidInstance from "./lib/isValidInstance.js";
import { useNavigate } from "@solidjs/router";

const LoginIndexPage: Component = () => {
  const navigate = useNavigate();
  const [validInstance, setValidInstance] = createSignal<boolean>(false);

  isValidInstance(csi.getInstanceUrl()).then((isValid) => {
    setValidInstance(isValid);

    if (!isValid) {
      navigate("/login/instance");
    }
  });

  if (validInstance() === false) {
    return <>checking if instance is valid</>;
  }

  return <>Login Page</>;
};

export default LoginIndexPage;
