/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";

const Redirect: Component<{ to: string }> = (props) => {
  const navigate = useNavigate();

  navigate(props.to);

  return <>Redirecting to {props.to}</>;
};

export default Redirect;
