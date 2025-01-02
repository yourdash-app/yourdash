/*
 * Copyright ©2025 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const LoginRedirect: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const uncheckedInstanceUrl = params["*"] as string;

    fetch(`${uncheckedInstanceUrl}/test`)
      .then((res) => res.json())
      .then((json) => {
        if (json.type === "yourdash") {
          localStorage.setItem("current_server", uncheckedInstanceUrl);
          navigate("/login");
        } else {
          alert("This is not a valid YourDash instance");
        }
      })
      .catch(() => {
        alert("This is not a valid YourDash instance");
      });
  }, [params.instanceUrl]);

  return <>Redirecting to login for {params.instanceUrl}</>;
};

export default LoginRedirect;
