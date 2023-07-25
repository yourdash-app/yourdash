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

import React, { CSSProperties, MouseEventHandler } from "react";

import styles from "./Card.module.scss";
import clippy from "../../../helpers/clippy";

export interface ICard extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  onClick?: MouseEventHandler<HTMLDivElement> | ( () => void );
  children: React.ReactNode;
  style?: CSSProperties;
  className?: string;
  level?: "primary" | "secondary" | "tertiary";
  showBorder?: boolean;
  unStyledClickable?: boolean;
}

const Card: React.FC<ICard> = ( {
  children,
  onClick,
  style,
  className,
  level,
  showBorder,
  unStyledClickable: unStyledClickable,
  ...extraProps
} ) => {
  if ( onClick ) {
    return (
      <div /* eslint-disable-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
        tabIndex={0} /* eslint-disable-line jsx-a11y/no-noninteractive-tabindex */
        // @ts-ignore
        style={{ ...style }}
        onClick={onClick}
        {...extraProps}
        className={clippy( styles.component, !unStyledClickable && styles.clickable, level === "secondary" && styles.secondary, level === "tertiary" && styles.tertiary, className, showBorder && styles.border )}
      >
        {children}
      </div>
    );
  } else {
    return (
      <div {...extraProps} style={style} className={clippy( styles.component, level === "secondary" && styles.secondary, level === "tertiary" && styles.tertiary, className, showBorder && styles.border )}>
        {children}
      </div>
    );
  }
};

export default Card;
