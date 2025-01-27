/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import { PHOTOS_MEDIA_TYPE } from "../../shared/types/mediaType.ts";
import PhotoGrid from "../components/PhotoGrid/PhotoGrid.tsx";
import styles from "./index.module.scss";
import { Heading, Separator } from "@yourdash/uikit/src/components/index";
import YOURDASH_LOGO from "../../icon.avif";

const IndexPage: FC = () => {
  return (
    <>
      <div className={styles.page}>
        <Heading
          level={1}
          text={"All Photos"}
        />
        <Separator direction={"column"} />
        <PhotoGrid
          items={Array(64)
            .keys()
            .toArray()
            .map(() => {
              return {
                mediaType: PHOTOS_MEDIA_TYPE.Image,
                imageSrc: YOURDASH_LOGO,
                onClick: () => {
                  return 0;
                },
                accessibleLabel: "Accessible Label",
              };
            })}
          onFetchNewPage={() => {
            return 0;
          }}
        />
      </div>
    </>
  );
};

export default IndexPage;
