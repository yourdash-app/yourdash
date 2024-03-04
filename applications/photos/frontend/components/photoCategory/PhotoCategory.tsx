/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "@yourdash/web-client/src/helpers/clippy";
import { Card, IconButton, YourDashIcon } from "@yourdash/web-client/src/ui/index";
import { IPhotoCategory } from "../../../shared/types/photoCategory";
import PhotoGrid from "../../views/photoGrid/PhotoGrid";
import styles from "./PhotoCategory.module.scss";

const PhotoCategory: React.FC<IPhotoCategory> = ({ name, items, id }) => {
  const [open, setOpen] = React.useState<boolean>(true);

  return (
    <Card className={styles.component}>
      <div className={clippy(styles.header, open && styles.open)}>
        {open ? (
          <IconButton
            onClick={() => {
              setOpen(false);
            }}
            icon={YourDashIcon.FoldUp}
          />
        ) : (
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
            icon={YourDashIcon.FoldDown}
          />
        )}
        <div className={styles.label}>{name}</div>
      </div>
      {open && (
        <div className={styles.content}>
          <PhotoGrid photos={items} />
        </div>
      )}
    </Card>
  );
};

export default PhotoCategory;
