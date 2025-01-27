/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import Card from "@yourdash/uikit/src/components/card/card.js";
import Text from "@yourdash/uikit/src/components/text/text.js";
import { FC } from "react";
import path from "path-browserify";
import { useNavigate } from "react-router-dom";
import { useNavigateTo } from "../../../../../meta.yourdash.ts";
import styles from "./album.module.scss";

const Album: FC<{ album: { path: string; displayName: string } }> = ({ album }) => {
  const navigateTo = useNavigateTo();

  return (
    <Card
      containerClassName={styles.album}
      key={album.path}
      onClick={() => {
        navigateTo("/album/" + coreCSI.path.toUnix(album.path));
      }}
    >
      <Text text={path.basename(coreCSI.path.toUnix(album.path))} />
    </Card>
  );
};

export default Album;
