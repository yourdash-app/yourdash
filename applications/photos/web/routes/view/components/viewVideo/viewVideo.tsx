/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import csi from "@yourdash/csi/csi.js";
import { UKIcon } from "@yourdash/uikit/components/icon/iconDictionary";
import IconButton from "@yourdash/uikit/components/iconButton/iconButton";
import ProgressBar from "@yourdash/uikit/components/progressBar/progressBar";
import PanAndZoom from "@yourdash/uikit/views/panAndZoom/panAndZoom";
import { FC, useRef, useState } from "react";
import styles from "./viewVideo.module.scss";

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
          src={csi.getInstanceUrl() + mediaUrl}
        />
      </PanAndZoom>
      {hasLoaded && (
        <>
          {duration > 0 && (
            <div className={styles.controls}>
              <IconButton
                accessibleLabel={"Rewind"}
                icon={UKIcon.ArrowLeft}
                onClick={() => {
                  ref.current.currentTime -= 2;
                }}
              />
              <IconButton
                accessibleLabel={"Play / Pause"}
                icon={isPlaying ? UKIcon.Stop : UKIcon.Play}
                onClick={() => {
                  isPlaying ? ref.current.pause() : ref.current.play();
                }}
              />
              <IconButton
                accessibleLabel={"Fast Forward"}
                icon={UKIcon.ArrowRight}
                onClick={() => {
                  ref.current.currentTime += 2;
                }}
              />
              <ProgressBar value={currentTime / duration} />
              <IconButton
                accessibleLabel={"Loop"}
                icon={shouldLoop ? UKIcon.CrossReference : UKIcon.FeedMerged}
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
