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

import React, { CSSProperties, useState } from "react";
import IconButton from "../iconButton/IconButton";
import styles from "./Dialog.module.scss";
import { YourDashIcon } from "../icon/iconDictionary";
import { Card } from "../..";

export interface IDialog {
  onClose?: () => void;
  className?: string;
  visible?: boolean;
  style?: CSSProperties;
  title?: string;
  children?: React.ReactNode;
}

const Dialog: React.FC<IDialog> = ( {
  children,
  onClose,
  className,
  visible,
  style,
  title
} ) => {
  const [initialDragPosition, setInitialDragPosition] = useState( 0 );
  
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={`${ styles.background } ${ visible === false && styles.hidden }`}
      onClick={onClose}
      onMouseUp={e => {
        if ( e.screenY > initialDragPosition ) {
          onClose?.();
        }
      }}
      onTouchEnd={e => {
        if ( e.touches[0].screenY < initialDragPosition ) {
          onClose?.();
        }
      }}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <Card
        showBorder
        className={`${ styles.component } ${ visible === false && styles.hidden }`}
        style={style}
        onMouseUp={e => {
          e.stopPropagation();
        }}
        onClick={e => {
          e.stopPropagation();
        }}
        unStyledClickable
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <section
          className={styles.handle}
          onMouseDown={e => {
            setInitialDragPosition( e.screenY );
          }}
          onMouseUp={e => {
            if ( e.screenY < initialDragPosition ) {
              onClose?.();
            }
          }}
          onTouchStart={e => {
            setInitialDragPosition( e.touches[0].screenY );
          }}
          onTouchEnd={e => {
            if ( e.touches[0].screenY < initialDragPosition ) {
              onClose?.();
            }
          }}
        >
          <div/>
        </section>
        <IconButton className={styles.closeButton} data-visible={!!onClose} icon={YourDashIcon.X16} onClick={onClose}/>
        <section className={`${ styles.content } ${ className }`}>
          <h1 className={`${ styles.title } ${ ( title === "" || title === undefined ) && styles.placeholder }`}>
            {title}
          </h1>
          {children}
        </section>
      </Card>
    </div>
  );
};

export default Dialog;
