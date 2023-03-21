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

    console.log( token )

    // V4X;G84(H9@)bxAapi^£x84Dr-WfR52dh'Nge.#_G$dt0cG5Cpz|jwxr(w8AjtoPacsT$9Aw~Fk_;V1)"lHucjW7sRkbn£QL2a(£mR$BW9k!;B0,xSq!rqY~4tifSucP
  }, [] )

  if (url === "") return <></>

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
