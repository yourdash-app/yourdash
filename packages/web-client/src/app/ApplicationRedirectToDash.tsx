/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useEffect } from "react";
import csi from "../web-client/src/helpers/csi";
import { useNavigate } from "react-router-dom";

const ApplicationRedirectToDash: React.FC = () => {
  const navigate = useNavigate();
  useEffect( () => {
    if ( !localStorage.getItem( "current_server" ) ) {
      setTimeout( () => {
        console.clear();
      }, 1000 );
      navigate( "/login" );
    } else {
      csi.getJson(
        "/core/login/is-authenticated",
        () => {
          navigate( "/app/a/dash" );
        },
        () => {
          setTimeout( () => {
            console.clear();
          }, 1000 );
          localStorage.removeItem( "session_token" );
          navigate( "/login" );
        }
      );
    }
  }, [] );
  return null;
};

export default ApplicationRedirectToDash;
