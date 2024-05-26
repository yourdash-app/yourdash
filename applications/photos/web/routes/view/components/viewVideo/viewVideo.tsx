/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import ProgressBar from "@yourdash/chiplet/components/progressBar/ProgressBar";
import csi from "@yourdash/csi/csi.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";
import PanAndZoom from "@yourdash/uikit/views/panAndZoom/panAndZoom";
import { FC, useRef, useState } from "react";
import styles from "./viewVideo.module.scss";

const ViewVideo: FC<{ mediaUrl: string }> = ({ mediaUrl }) => {
  const ref = useRef<HTMLVideoElement>(null!);
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <>
      <PanAndZoom>
        <video
          onLoadedMetadata={() => setHasLoaded(true)}
          ref={ref}
          draggable={false}
          autoPlay={true}
          className={styles.viewVideo}
          src={csi.getInstanceUrl() + mediaUrl}
        />
      </PanAndZoom>
      {hasLoaded && (
        <>
          {ref.current.duration && (
            <div>
              <IconButton
                accessibleLabel={"Play / Pause"}
                icon={ref.current.paused ? UKIcon.Play : UKIcon.Stop}
                onClick={() => {
                  ref.current.paused ? ref.current.play() : ref.current.pause();
                }}
              />
              <ProgressBar value={ref.current.currentTime / ref.current.duration} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewVideo;
