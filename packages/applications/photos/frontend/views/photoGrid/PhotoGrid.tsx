/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { IPhotoCategory } from "../../../shared/types/photoCategory";
import Photo from "../../components/photo/Photo";
import styles from "../../components/photoCategory/PhotoCategory.module.scss";

const PhotoGrid: React.FC<{ photos: IPhotoCategory["items"] }> = ( { photos } ) => {
  return <div className={ styles.content }>
    { photos.map( ( photo, index ) => {
      return <Photo
        key={ index }
        fileName={ photo.fileName }
        date={ photo.date }
        dimensions={ photo.dimensions }
        people={ photo.people }
        tags={ photo.tags }
        url={ photo.url }
      />
    } ) }
  </div>
}

export default PhotoGrid
