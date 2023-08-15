import React from "react";
import FilesLayout from "./FilesLayout";
import ThumbnailsSmallLayout from "./layout/ThumbnailsSmallLayout";

const FilesApplication: React.FC = () => (
  <FilesLayout>
    <ThumbnailsSmallLayout/>
  </FilesLayout>
);

export default FilesApplication;
