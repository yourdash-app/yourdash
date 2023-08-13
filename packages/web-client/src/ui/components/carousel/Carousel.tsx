/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
                icon={YourDashIcon.ChevronLeft16}
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
                icon={YourDashIcon.ChevronRight16}
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
