/*
 * Created on Tue Oct 25 2022-2023
 *
 * Copyright © 2022-2023 Ewsgit
 */

import React, { useEffect, useState } from "react";
import SERVER, { verifyAndReturnJson } from "../../../../server";
// @ts-ignore
import { ChipletIconDictionary } from "ui/components/icon/iconDictionary.ts";

export interface IServerImage extends React.ComponentPropsWithoutRef<'img'> {
  src: string
}

const ServerImage: React.FC<IServerImage> = ({
                                               src, ...imgElementProps
                                             }) => {
  const [ imgSrc, setImgSrc ] = useState(ChipletIconDictionary["server-error"])
  useEffect(() => {
    verifyAndReturnJson(
        SERVER.get(src),
        (json: { image: string }) => {
          setImgSrc(json?.image || ChipletIconDictionary["server-error"])
        },
        () => {
          setImgSrc(ChipletIconDictionary["server-error"])
        })
  }, [ src ])

  return (
    <img
      draggable={ false }
      src={ imgSrc }
      onError={ () => {
            console.error("Failed to load image")
            setImgSrc(ChipletIconDictionary["server-error"])
          } }
      alt=""
      { ...imgElementProps }
    />
  )
};

export default ServerImage;
