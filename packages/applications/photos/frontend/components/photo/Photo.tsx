/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { IPhoto } from "../../../shared/types/photo";
import styles from "./Photo.module.scss";

const Photo: React.FC<IPhoto> = ( { fileName, dimensions, tags, people, date, url } ) => {
  return <div className={styles.component}>
    <img className={styles.photo} src={url} />
  </div>
}

export default Photo
