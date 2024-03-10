/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi";
import React from "react";
import { useParams } from "react-router-dom";
import { IPhoto } from "../../shared/photo";

const PhotoPage: React.FC = () => {
  const photoId = useParams()["*"];
  const [photoData, setPhotoData] = React.useState<IPhoto>();

  React.useEffect(() => {
    csi.getJson(
      "/app/photos/photo/" + photoId,
      (photo: IPhoto) => {
        setPhotoData(photo);
      },
      () => {
        window.history.back();
      },
    );
  }, [photoId]);

  if (!photoData) {
    return null;
  }

  return (
    <div>
      <h1>Photo Page</h1>
      {photoId}
      {csi.getInstanceUrl() + photoData.imageUrl}
      <img src={csi.getInstanceUrl() + photoData.imageUrl} alt={""} />
    </div>
  );
};

export default PhotoPage;
