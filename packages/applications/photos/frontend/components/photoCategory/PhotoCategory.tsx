/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "helpers/clippy";
import { Card, Icon, IconButton, YourDashIcon } from "web-client/src/ui/index";
import { IPhotoCategory } from "../../../shared/types/photoCategory";
import Photo from "../photo/Photo";
import styles from "./PhotoCategory.module.scss"

const PhotoCategory: React.FC<IPhotoCategory> = ( { name, items, id } ) => {
  const [ open, setOpen ] = React.useState<boolean>( true )

  return <Card
    className={styles.component}
  >
    <div className={clippy( styles.header, open && styles.open )}>
      {
        open
          ? <IconButton onClick={() => {
            setOpen( false )
          }} icon={YourDashIcon.FoldUp}/>
          : <IconButton onClick={() => {
            setOpen( true )
          }} icon={YourDashIcon.FoldDown}/>
      }
      <div className={styles.label}>{name}</div>
    </div>
    {
      open && <div className={styles.content}>
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
    }
  </Card>
}

export default PhotoCategory
