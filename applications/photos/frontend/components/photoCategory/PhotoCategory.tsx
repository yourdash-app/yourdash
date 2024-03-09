/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Card from "@yourdash/uikit/depChiplet/components/card/Card";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/depChiplet/components/iconButton/IconButton";
import React from "react";
import { IPhotoAlbum } from "../../../shared/types/photoAlbum";
import PhotoGrid from "../../views/photoGrid/PhotoGrid";
import styles from "./PhotoCategory.module.scss";

const PhotoCategory: React.FC<IPhotoAlbum> = ({ name, items }) => {
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
          <PhotoGrid gridPhotoPaths={items.photos} />
        </div>
      )}
    </Card>
  );
};

export default PhotoCategory;
