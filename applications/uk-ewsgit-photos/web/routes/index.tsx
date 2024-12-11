/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { FC } from "react";
import AlbumMediaGrid from "../components/AlbumMediaGrid/AlbumMediaGrid";
import SubAlbums from "../components/SubAlbums/SubAlbums";
import styles from "./index.module.scss";
import { Separator } from "@yourdash/uikit/components/index";

const IndexPage: FC = () => {
  return (
    <>
      <div className={styles.page}>
        <SubAlbums path={"/photos"} />
        <Separator direction={"column"} />
        <AlbumMediaGrid path={"/photos"} />
      </div>
    </>
  );
};

export default IndexPage;
