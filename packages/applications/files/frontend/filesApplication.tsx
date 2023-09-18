/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import FilesLayout from "./FilesLayout";
import ThumbnailsSmallLayout from "./layout/ThumbnailsSmallLayout";

const FilesApplication: React.FC = () => (
  <FilesLayout>
    <ThumbnailsSmallLayout/>
  </FilesLayout>
);

export default FilesApplication;
