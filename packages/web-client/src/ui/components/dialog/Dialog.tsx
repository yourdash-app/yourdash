/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
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
        <IconButton className={styles.closeButton} data-visible={!!onClose} icon={YourDashIcon.X} onClick={onClose}/>
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
