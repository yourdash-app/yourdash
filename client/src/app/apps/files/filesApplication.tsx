import React, { useEffect, useState } from "react";
import FilesLayout from "./FilesLayout";
import DetailsLayout from "./layout/DetailsLayout";
import ThumbnailsSmallLayout from "./layout/ThumbnailsSmallLayout";

const FilesApplication: React.FC = () => (
  <FilesLayout>
    <ThumbnailsSmallLayout/>
  </FilesLayout>
);

export default FilesApplication;
