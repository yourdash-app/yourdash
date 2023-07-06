import React, {useRef} from "react";
import {IconButton} from "../..";
import styles from "./Carousel.module.scss";

export interface ICarousel extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode[] | React.ReactNode;
  containerClassName?: string;
  className?: string;
  compactControls?: boolean;
}

const Carousel: React.FC<ICarousel> = ({
  children,
  containerClassName,
  className,
  compactControls,
  ...extraProps
}) => {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div {...extraProps} className={`${styles.component} ${containerClassName}`}>
      <div
        className={`${styles.main} ${className}`}
        ref={pageRef}
        onScroll={e => e.preventDefault()}
      >
        {children}
      </div>
      <div
        className={`${styles.controls} ${
          compactControls && styles.controlsCompact
        }`}
      >
        {children instanceof Array
          ? (
            <>
              <IconButton
                icon={"chevron-left-16"}
                onClick={() => {
                  if (!pageRef.current) {
                    return;
                  }
                  const container = pageRef.current as HTMLDivElement;

                  container.scrollTo({
                    left:
                    container.scrollLeft -
                    (container.getBoundingClientRect().width / 4) * 3
                  });
                }}
              />
              <IconButton
                icon={"chevron-right-16"}
                onClick={() => {
                  if (!pageRef.current) {
                    return;
                  }
                  const container = pageRef.current as HTMLDivElement;

                  container.scrollTo({
                    left:
                    container.scrollLeft +
                    (container.getBoundingClientRect().width / 4) * 3
                  });
                }}
              />
            </>
          )
          : null}
      </div>
    </div>
  );
};

export default Carousel;
