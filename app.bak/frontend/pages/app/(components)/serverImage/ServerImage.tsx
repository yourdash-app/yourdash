/*
 * Created on Tue Oct 25 2022-2023
 *
 * Copyright © 2022-2023 Ewsgit
 */

import React, { useEffect, useState } from "react";
// @ts-ignore
import { ChipletIconDictionary } from "~/chipletui/components/icon/iconDictionary.ts";

export interface IServerImage extends React.ComponentPropsWithoutRef<'img'> {
  src: string
}

const ServerImage: React.FC<IServerImage> = ({ src, ...imgElementProps }) => {
  const [ url, setUrl ] = useState( "" )
  const [ username, setUsername ] = useState( "" )
  const [ token, setToken ] = useState( "" )

  useEffect( () => {
    setUrl( localStorage.getItem( "currentServer" ) || "" )
    setUsername( localStorage.getItem( "username" ) || "" )
    setToken( sessionStorage.getItem( "sessiontoken" ) || "" )
  }, [] )

  if (url === "") return <></>
  if (username === "") return <></>
  if (token === "") return <></>

  return (
      <img
          draggable={ false }
          src={ `${ url }/api${ src }?u=${ username }&t=${ token }` }
          onError={ () => {
            console.error( `Failed to load image: ${ url }/api${ src }` )
          } }
          alt=""
          { ...imgElementProps }
      />
  )
};

export default ServerImage;
