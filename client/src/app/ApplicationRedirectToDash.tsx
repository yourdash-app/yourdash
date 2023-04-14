import React, { useEffect } from "react";
import getJson from "../helpers/fetch";

const ApplicationRedirectToDash: React.FC = () => {
  useEffect(() => {
    if (!localStorage.getItem("current_server")) {
      setTimeout(() => {
        console.clear();
      }, 1000);
      window.location.href = "#/login";
    } else {
      getJson(
        `/login/is-authenticated`,
        () => {
          window.location.href = "#/app/a/dash";
        },
        () => {
          setTimeout(() => {
            console.clear();
          }, 1000);
          sessionStorage.removeItem("session_token");
          window.location.href = "#/login";
        },
      );
    }
  }, []);
  return <></>;
};

export default ApplicationRedirectToDash;
