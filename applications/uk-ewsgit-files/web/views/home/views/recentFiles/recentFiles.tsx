/*
 * Copyright ©2025 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";
import React from "react";
import FileList from "../../../fileList/fileList";

const RecentFiles: React.FC = () => {
  return (
    <div>
      <UKHeading text={"Recent Files"} />
      <FileList
        files={[
          {
            displayName: "File 1",
            path: "/Documents/file1",
            thumbnail: "file1",
            metadata: {
              fileSize: "10 MB",
              tags: ["tag1", "tag2"],
              lastModified: "10/10/2020",
            },
          },
          {
            displayName: "File 2",
            path: "/Documents/file2",
            thumbnail: "file2",
            metadata: {
              fileSize: "10 MB",
              tags: ["tag1", "tag2"],
              lastModified: "10/10/2020",
            },
          },
          {
            displayName: "File 3",
            path: "/Documents/file3",
            thumbnail: "file3",
            metadata: {
              fileSize: "10 MB",
              tags: ["tag1", "tag2"],
              lastModified: "10/10/2020",
            },
          },
          {
            displayName: "File 4",
            path: "/Documents/file4",
            thumbnail: "file4",
            metadata: {
              fileSize: "10 MB",
              tags: ["tag1", "tag2"],
              lastModified: "10/10/2020",
            },
          },
          {
            displayName: "File 5",
            path: "/Documents/file5",
            thumbnail: "file5",
            metadata: {
              fileSize: "10 MB",
              tags: ["tag1", "tag2"],
              lastModified: "10/10/2020",
            },
          },
          {
            displayName: "File 6",
            path: "/Documents/file6",
            thumbnail: "file6",
            metadata: {
              fileSize: "10 MB",
              tags: ["tag1", "tag2"],
              lastModified: "10/10/2020",
            },
          },
        ]}
      />
    </div>
  );
};

export default RecentFiles;
