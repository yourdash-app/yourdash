/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Box from "@yourdash/uikit/src/components/box/box.js";
import ButtonWithIcon from "@yourdash/uikit/src/components/buttonWithIcon/buttonWithIcon";
import Heading from "@yourdash/uikit/src/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/src/components/iconButton/iconButton";
import PanAndZoom from "@yourdash/uikit/src/views/panAndZoom/panAndZoom.js";
import useResource from "@yourdash/csi/useResource";
import { FC } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import EndpointMediaRaw from "../../../shared/types/endpoints/media/album/raw.js";
import { acsi } from "../../meta.yourdash.ts";
import ViewVideo from "./components/viewVideo/viewVideo.js";
import styles from "./index.module.scss";
import ViewImage from "./components/viewImage/viewImage.js";
import { PHOTOS_MEDIA_TYPE } from "../../../shared/types/mediaType.js";
import coreCSI from "@yourdash/csi/coreCSI";

const ViewPathPage: FC = () => {
  const mediaPath = useParams()["*"] || "/";
  const navigate = useNavigate();
  const media = useResource<EndpointMediaRaw>(() => acsi.getJson(`/media/raw/@/${mediaPath}`), [mediaPath]);

  return (
    <div className={clippy(styles.page, media?.type === PHOTOS_MEDIA_TYPE.Video && styles.video)}>
      <div className={styles.header}>
        <ButtonWithIcon
          text={"Go Back"}
          icon={UKIcon.ChevronLeft}
          onClick={() => {
            navigate(-1);
          }}
        />
        <div className={styles.spacer} />
        <ButtonWithIcon
          text={"Download"}
          icon={UKIcon.Download}
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
