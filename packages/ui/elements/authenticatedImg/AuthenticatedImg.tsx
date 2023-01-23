/*
 * Created on Tue Oct 25 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useEffect, useState } from "react";
import SERVER, { verifyAndReturnJson } from "../../../../apps/web/server";
import { YourDashIconRawDictionary } from "../icon/iconDictionary";

export interface IAuthenticatedImg extends React.ComponentPropsWithoutRef<'img'> {
  src: string
}

const AuthenticatedImg: React.FC<IAuthenticatedImg> = ({
                                                         src, ...imgElementProps
                                                       }) => {
  const [ imgSrc, setImgSrc ] = useState(YourDashIconRawDictionary["server-error"])
  useEffect(() => {
    verifyAndReturnJson(
        SERVER.get(src),
        (json: { image: string }) => {
          setImgSrc(json?.image || YourDashIconRawDictionary["server-error"])
        },
        () => {
          setImgSrc(YourDashIconRawDictionary["server-error"])
        })
  }, [ src ])

  return (
    <img
      draggable={false}
      src={imgSrc}
      onError={() => {
    console.error("Failed to load image")
    setImgSrc(YourDashIconRawDictionary["server-error"])
  }}
      alt=""
      {...imgElementProps}
    />
)
};

export default AuthenticatedImg;
