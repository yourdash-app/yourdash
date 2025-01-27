/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import useResource from "@yourdash/csi/useResource";
import { ButtonWithIcon } from "@yourdash/uikit/src/components/index";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EndpointMediaRaw from "../../../shared/types/endpoints/media/album/raw.js";
import { acsi } from "../../meta.yourdash.ts";
import ViewVideo from "./components/viewVideo/viewVideo.js";
import styles from "./index.module.scss";
import ViewImage from "./components/viewImage/viewImage.js";
import { PHOTOS_MEDIA_TYPE } from "../../../shared/types/mediaType.js";
import coreCSI from "@yourdash/csi/coreCSI";
import UK from "@yourdash/uikit";

const ViewPathPage: FC = () => {
  const mediaPath = useParams()["*"] || "/";
  const navigate = useNavigate();
  const media = useResource<EndpointMediaRaw>(() => acsi.getJson(`/media/raw/@/${mediaPath}`), [mediaPath]);

  return (
    <div className={clippy(styles.page, media?.type === PHOTOS_MEDIA_TYPE.Video && styles.video)}>
      <div className={styles.header}>
        <ButtonWithIcon
          text={"Go Back"}
          icon={UKIcons.ChevronLeft}
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className={styles.spacer} />
        <ButtonWithIcon
          text={"Download"}
          icon={UKIcons.Download}
          onClick={() => {
            window.open(`${coreCSI.getInstanceUrl()}${media?.mediaUrl}`, "_blank");
          }}
        />
      </div>
      {media && (
        <>
          {media.type === PHOTOS_MEDIA_TYPE.Image && <ViewImage mediaUrl={media.mediaUrl} />}
          {media.type === PHOTOS_MEDIA_TYPE.Video && <ViewVideo mediaUrl={media.mediaUrl} />}
        </>
      )}
    </div>
  );
};

export default ViewPathPage;
