/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Box from "@yourdash/uikit/components/box/box.js";
import ButtonWithIcon from "@yourdash/uikit/components/buttonWithIcon/buttonWithIcon";
import Heading from "@yourdash/uikit/components/heading/heading.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary.js";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";
import PanAndZoom from "@yourdash/uikit/views/panAndZoom/panAndZoom.js";
import useResource from "@yourdash/csi/useResource";
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
    <div className={clippy(styles.page, media?.type === MEDIA_TYPE.VIDEO && styles.video)}>
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
            window.open(`${csi.getInstanceUrl()}${media?.mediaUrl}`, "_blank");
          }}
        />
      </div>
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
