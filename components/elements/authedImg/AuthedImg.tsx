/*
 * Created on Tue Oct 25 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useEffect, useState } from "react";
import { YourDashIconRawDictionary } from "../icon/iconDictionary";
import SERVER from "./../../../lib/server"

export interface IAuthedImg extends React.ComponentPropsWithoutRef<'img'> {
  src: string
}

const AuthedImg: React.FC<IAuthedImg> = ({ src, ...imgElementProps }) => {
  const [ imgSrc, setImgSrc ] = useState(YourDashIconRawDictionary[ "server-error" ])
  useEffect(() => {
    SERVER.get(src)
      .then(res => res.blob())
      .then(blob => {
        setImgSrc(URL.createObjectURL(blob))
      })
      .catch(err => console.error(err))
  }, [ src ])

  return <img draggable={false} src={imgSrc} alt="" {...imgElementProps} />
};

export default AuthedImg;
