/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { Icon, UKImage } from "@yourdash/uikit/components/index";
import { UKIcon } from "@yourdash/uikit/core/index";
import React from "react";
import { PHOTOS_MEDIA_TYPE } from "../../../shared/types/mediaType.ts";
import styles from "./PhotoGrid.module.scss";

const PhotoGrid: React.FC<{
  items: { imageSrc: string; accessibleLabel: string; onClick: () => void; mediaType: PHOTOS_MEDIA_TYPE }[];
  onFetchNewPage: () => void;
}> = ({ items }) => {
  return (
    <div className={styles.component}>
      {items.map((i) => {
        console.log(i);
        return (
          <div>
            <UKImage
              accessibleLabel={i.accessibleLabel}
              src={i.imageSrc}
              noRounding={true}
            />
            {i.mediaType === PHOTOS_MEDIA_TYPE.Video && <Icon icon={UKIcon.Video} />}
          </div>
        );
      })}
    </div>
  );
};

export default PhotoGrid;
