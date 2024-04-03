/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Redirect: React.FC<{ to: string }> = ({ to }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [to]);

  return <>Redirecting to {to}</>;
};

export default Redirect;
