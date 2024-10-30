/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Text from "@yourdash/uikit/src/components/text/text";
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
      <Text text={displayName} />
      <Text text={path} />
    </div>
  );
};

export default FileListFile;
