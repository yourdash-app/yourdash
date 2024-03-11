/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import clippy from "@yourdash/shared/web/helpers/clippy";
import styles from "./Slides.module.scss";

export interface ISlides {
  slides: React.ReactNode[];
  interval?: number;
}

const Slides: React.FC<ISlides> = ({ slides, interval }) => {
  let timeoutId = 0;
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  React.useEffect(() => {
    // @ts-ignore
    timeoutId = setTimeout(() => {
      if (currentSlideIndex < slides.length - 1) {
        setCurrentSlideIndex(currentSlideIndex + 1);
      } else {
        setCurrentSlideIndex(0);
      }
    }, interval || 2500);
  }, [currentSlideIndex]);

  if (slides.length === 0) {
    return <div>No Slides Provided</div>;
  }

  return (
    <div className={"w-full h-full bg-bg relative overflow-hidden select-none"}>
      {currentSlideIndex !== 0 ? (
        <div className={styles.previousFrame} key={currentSlideIndex - 1}>
          {slides[currentSlideIndex - 1]}
        </div>
      ) : (
        <div className={styles.previousFrame} key={slides.length - 1}>
          {slides[slides.length - 1]}
        </div>
      )}
      <div className={styles.currentFrame} key={currentSlideIndex}>
        {slides[currentSlideIndex]}
      </div>
      <section className={"absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 items-center justify-center h-4"}>
        {slides.map((child, index) => {
          return (
            <div
              key={index}
              className={clippy(
                index === currentSlideIndex
                  ? "w-10 bg-button-active-bg active:bg-button-active-bg hover:bg-button-active-bg"
                  : "w-5 bg-button-bg hover:w-8 hover:bg-button-hover-bg active:bg-button-active-bg",
                "h-3 rounded-button-rounding [transition:var(--transition-slower)] hover:[transition:var(--transition)]",
              )}
              onClick={() => {
                clearTimeout(timeoutId);
                setCurrentSlideIndex(index);
              }}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Slides;
