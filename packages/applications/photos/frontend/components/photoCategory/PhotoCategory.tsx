/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { IPhotoCategory } from "../../../shared/types/photoCategory";
import Photo from "../photo/Photo";
import styles from "./PhotoCategory.module.scss"

const PhotoCategory: React.FC<IPhotoCategory> = ( { name, items, id } ) => {
  return <section className={styles.component}>
    <h2>{name}</h2>
    <div className={styles.content}>
      {items.map( ( photo, index ) => {
        return <Photo
          key={index}
          fileName={photo.fileName}
          date={photo.date}
          dimensions={photo.dimensions}
          people={photo.people}
          tags={photo.tags}
          url={photo.url}
        />
      } )}
    </div>
  </section>
}

export default PhotoCategory
