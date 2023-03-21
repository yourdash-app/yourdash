/*
 * Created on Tue Oct 25 2022-2023
 *
 * Copyright © 2022-2023 Ewsgit
 */

import React, { useEffect, useState } from "react";
import SERVER, { verifyAndReturnJson } from "../../../../server";
// @ts-ignore
import { ChipletIconDictionary } from "~/chipletui/components/icon/iconDictionary.ts";

export interface IServerImage extends React.ComponentPropsWithoutRef<'img'> {
  src: string
}

const ServerImage: React.FC<IServerImage> = ({
                                               src, ...imgElementProps
                                             }) => {
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(localStorage.getItem( "currentServer" ) || "")
  }, [])

  if (!url) return <></>

  return (
      <img
          draggable={ false }
          src={ `${ url }/api${ src }` }
          onError={ () => {
            console.error( `Failed to load image: ${src}` )
          } }
          alt=""
          { ...imgElementProps }
      />
  )
};

export default ServerImage;
