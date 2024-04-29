/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const navigate = useNavigate()

  useEffect( () => {
    window.localStorage.setItem( "isDesktop", "true" );
    setTimeout( () => {
      navigate( "/login" )
    }, 100 )
  }, [] );

  return <>detected desktop client</>
}

export default Index
