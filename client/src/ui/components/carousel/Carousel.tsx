import React, { useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.scss";
import Icon from "../icon/Icon";

export interface ICarousel extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  compactControls?: boolean;
}

const Carousel: React.FC<ICarousel> = ({
  children,
  className,
  compactControls,
  ...extraProps
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState<JSX.Element>(<div />);
  const [item, setItem] = useState<number>(0);

  useEffect(() => {
    if (!pageRef) return;
    setIndicator(
      <div className={styles.indicator}>
        {children instanceof Array ? (
          children.map((child, ind) => {
            if (!pageRef.current) {
              // eslint-disable-next-line react/no-array-index-key
              return <i key={ind} />;
            }
            const container = pageRef.current as HTMLDivElement;
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={ind}
                style={{
                  backgroundColor:
                    Math.round(
                      container.scrollLeft /
                        (container.getBoundingClientRect().width || 0)
                    ) === ind
                      ? "rgb(var(--container-fg))"
                      : "rgb(var(--container-bg))",
                }}
              />
            );
          })
        ) : (
          <div
            style={{
              backgroundColor:
                Math.round(
                  (pageRef?.current?.scrollLeft || 0) /
                    (pageRef.current?.getBoundingClientRect().width || 0)
                ) === 0
                  ? "rgb(var(--container-fg))"
                  : "rgb(var(--container-bg))",
            }}
          />
        )}
      </div>
    );
  }, [pageRef, children]);

  return (
    <div {...extraProps} className={`${styles.component} ${className}`}>
      <div
        className={styles.main}
        ref={pageRef}
        onScroll={(e) => {
          return e.preventDefault();
        }}
      >
        {children}
      </div>
      <div
        className={`${styles.controls} ${
          compactControls && styles.controlsCompact
        }`}
      >
        {children instanceof Array ? (
          <>
            <button
              type={"button"}
              onClick={() => {
                if (!pageRef.current) return;
                const container = pageRef.current as HTMLDivElement;
                if (!container.children.item(item - 1)) return;

                container.scrollTo({
                  left:
                    container.children.item(item - 1)?.getBoundingClientRect()
                      .left || 0,
                });

                setItem(item - 1);
              }}
            >
              <Icon name="chevron-left-16" color="rgb(var(--button-fg))" />
            </button>
            <button
              type={"button"}
              onClick={() => {
                if (!pageRef.current) return;
                const container = pageRef.current as HTMLDivElement;
                if (!container.children.item(item + 1)) return;

                container.scrollTo({
                  left:
                    container.children.item(item + 1)?.getBoundingClientRect()
                      .left || 0,
                });

                setItem(item - 1);
              }}
            >
              <Icon name="chevron-right-16" color="rgb(var(--button-fg))" />
            </button>
          </>
        ) : null}
      </div>
      {indicator}
    </div>
  );
};

export default Carousel;
