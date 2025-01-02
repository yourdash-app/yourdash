/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import React from "react";
import FileListFile from "./components/fileListFile/fileListFile";
import styles from "./fileList.module.scss";
import UK from "@yourdash/uikit";

const FileList: React.FC<{
  files: { displayName: string; path: string; thumbnail?: string; metadata: { fileSize: string; tags: string[]; lastModified: string } }[];
}> = ({ files }) => {
  return (
    <UK.Core.IncrementLevel>
      <div className={styles.view}>
        {files.map((file, index) => {
          return (
            <FileListFile
              displayName={file.displayName}
              path={file.path}
              thumbnail={file.thumbnail}
              metadata={file.metadata}
              isOddIndex={index % 2 === 1}
            />
          );
        })}
      </div>
    </UK.Core.IncrementLevel>
  );
};

export default FileList;
