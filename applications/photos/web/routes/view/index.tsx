/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Box from "@yourdash/uikit/components/box/box.js";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";
import PanAndZoom from "@yourdash/uikit/views/panAndZoom/panAndZoom.js";
import useResource from "@yourdash/web/src/lib/useResource.js";
import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EndpointMediaRaw from "../../../shared/types/endpoints/media/album/raw.js";
import ViewVideo from "./components/viewVideo/viewVideo.js";
import styles from "./index.module.scss";
import ViewImage from "./components/viewImage/viewImage.js";
import { MEDIA_TYPE } from "../../../shared/types/mediaType.js";
import csi from "@yourdash/csi/csi.js";

const ViewPathPage: FC = () => {
  const [searchParams] = useSearchParams();
  const mediaPath = searchParams.get("p") || "";
  const navigate = useNavigate();
  const media = useResource<EndpointMediaRaw>(() => csi.getJson(`/app::photos/media/raw/@/${mediaPath}`), [mediaPath]);

  return (
    <div className={styles.page}>
      <Box className={styles.header}>
        <IconButton
          accessibleLabel={"Go Back"}
          icon={UKIcon.ChevronLeft}
          onClick={() => {
            navigate(-1);
          }}
        />
        <Heading
          className={styles.heading}
          text={"View Media"}
        />
        <div className={styles.spacer}></div>
        <IconButton
          accessibleLabel={"Download media"}
          icon={UKIcon.Download}
          onClick={() => {
            window.open(`${csi.getInstanceUrl()}${media?.mediaUrl}`, "_blank");
          }}
        />
      </Box>
      {media && (
        <>
          {media.type === MEDIA_TYPE.IMAGE && <ViewImage mediaUrl={media.mediaUrl} />}
          {media.type === MEDIA_TYPE.VIDEO && <ViewVideo mediaUrl={media.mediaUrl} />}
        </>
      )}
    </div>
  );
};

export default ViewPathPage;
