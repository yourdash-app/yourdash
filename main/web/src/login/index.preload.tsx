/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import { Component, createSignal } from "solid-js";
import LoginIndexPage from "./index.js";
import isValidInstance from "./lib/isValidInstance.js";
import { useNavigate } from "@solidjs/router";

const LoginIndexPagePreload: Component = () => {
  const navigate = useNavigate();
  const [validInstance, setValidInstance] = createSignal<boolean | undefined>(undefined);

  isValidInstance(csi.getInstanceUrl()).then((isValid) => {
    setValidInstance(isValid);

    if (!isValid) {
      navigate("/login/instance");
    }
  });

  return (
    <>
      {validInstance() === undefined ? (
        <>checking if instance is valid</>
      ) : (
        <>
          <LoginIndexPage />
        </>
      )}
    </>
  );
};

export default LoginIndexPagePreload;
