/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import UKText from "@yourdash/uikit/src/components/text/UKText.js";
import React from "react";
import styles from "./fileListFile.module.scss";

const FileListFile: React.FC<{
  displayName: string;
  path: string;
  thumbnail?: string;
  metadata: { fileSize: string; tags: string[]; lastModified: string };
  isOddIndex?: boolean;
}> = ({ displayName, path, isOddIndex }) => {
  return (
    <div className={clippy(styles.component, isOddIndex ? styles.odd : styles.even)}>
      <UKText text={displayName} />
      <UKText text={path} />
    </div>
  );
};

export default FileListFile;
