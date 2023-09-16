/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useRef } from "react";
import { IconButton } from "../..";
import styles from "./Carousel.module.scss";
import { YourDashIcon } from "../icon/iconDictionary";

export interface ICarousel extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode[] | React.ReactNode;
  containerClassName?: string;
  className?: string;
  compactControls?: boolean;
}

const Carousel: React.FC<ICarousel> = ( {
  children,
  containerClassName,
  className,
  compactControls,
  ...extraProps
} ) => {
  const pageRef = useRef<HTMLDivElement>( null );
  
  return (
    <div {...extraProps} className={`${ styles.component } ${ containerClassName }`}>
      <div
        className={`${ styles.main } ${ compactControls && styles.mainControlsCompact } ${ className }`}
        ref={pageRef}
        onScroll={e => e.preventDefault()}
      >
        {children}
      </div>
      <div
        className={`${ styles.controls } ${
          compactControls && styles.controlsCompact
        }`}
      >
        {children instanceof Array
          ? (
            <>
              <IconButton
                icon={YourDashIcon.ChevronLeft}
                onClick={() => {
                  if ( !pageRef.current ) {
                    return;
                  }
                  const container = pageRef.current as HTMLDivElement;
                  
                  container.scrollTo( {
                    left:
                      container.scrollLeft -
                      // eslint-disable-next-line no-magic-numbers
                      ( container.getBoundingClientRect().width / 4 ) * 3
                  } );
                }}
              />
              <IconButton
                icon={YourDashIcon.ChevronRight}
                onClick={() => {
                  if ( !pageRef.current ) {
                    return;
                  }
                  const container = pageRef.current as HTMLDivElement;
                  
                  container.scrollTo( {
                    left:
                      container.scrollLeft +
                      // eslint-disable-next-line no-magic-numbers
                      ( container.getBoundingClientRect().width / 4 ) * 3
                  } );
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
