/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Card from "@yourdash/uikit/depChiplet/components/card/Card";
import Heading from "@yourdash/uikit/depChiplet/components/heading/Heading";
import { YourDashIcon } from "@yourdash/uikit/depChiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/depChiplet/components/iconButton/IconButton";
import path from "path-browserify";
import React from "react";
import { IPhotoAlbum } from "../../../shared/photoAlbum";
import PhotoGrid from "../../views/photoGrid/PhotoGrid";
import styles from "./PhotoCategory.module.scss";

const PhotoCategory: React.FC<IPhotoAlbum> = ({ label, items }) => {
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
        <Heading level={3} className={styles.label}>
          {label}
        </Heading>
      </div>
      {open && (
        <div className={styles.content}>
          <div className={"flex w-full gap-2"}>
            {items.subAlbums.map((album) => {
              return album;
            })}
          </div>
          <PhotoGrid gridPhotoPaths={items.photos} />
        </div>
      )}
    </Card>
  );
};

export default PhotoCategory;
