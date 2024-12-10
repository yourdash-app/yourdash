/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import coreCSI from "@yourdash/csi/coreCSI";
import { IconButton, ProgressBar } from "@yourdash/uikit/components/index";
import { PanAndZoom } from "@yourdash/uikit/views/index";
import { FC, useRef, useState } from "react";
import styles from "./viewVideo.module.scss";
import UK from "@yourdash/uikit";

const ViewVideo: FC<{ mediaUrl: string }> = ({ mediaUrl }) => {
  const ref = useRef<HTMLVideoElement>(null!);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [shouldLoop, setShouldLoop] = useState(false);

  return (
    <>
      <PanAndZoom>
        <video
          onCanPlayThrough={() => setHasLoaded(true)}
          onPlay={() => {
            setIsPlaying(true);
          }}
          onPause={() => {
            setIsPlaying(false);
          }}
          onDurationChange={() => {
            setDuration(ref.current.duration);
          }}
          onTimeUpdate={() => {
            setCurrentTime(ref.current.currentTime);
          }}
          loop={shouldLoop}
          ref={ref}
          draggable={false}
          autoPlay={true}
          className={styles.viewVideo}
          src={coreCSI.getInstanceUrl() + mediaUrl}
        />
      </PanAndZoom>
      {hasLoaded && (
        <>
          {duration > 0 && (
            <div className={styles.controls}>
              <IconButton
                accessibleLabel={"Rewind"}
                icon={UK.Core.Icons.ArrowLeft}
                onClick={() => {
                  ref.current.currentTime -= 2;
                }}
              />
              <IconButton
                accessibleLabel={"Play / Pause"}
                icon={isPlaying ? UK.Core.Icons.Stop : UK.Core.Icons.Play}
                onClick={() => {
                  isPlaying ? ref.current.pause() : ref.current.play();
                }}
              />
              <IconButton
                accessibleLabel={"Fast Forward"}
                icon={UK.Core.Icons.ArrowRight}
                onClick={() => {
                  ref.current.currentTime += 2;
                }}
              />
              <ProgressBar value={currentTime / duration} />
              <IconButton
                accessibleLabel={"Loop"}
                icon={shouldLoop ? UK.Core.Icons.CrossReference : UK.Core.Icons.FeedMerged}
                onClick={() => {
                  setShouldLoop(!shouldLoop);
                }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ViewVideo;
