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

import React, { CSSProperties } from "react";
import styles from "./Icon.module.scss";
// @ts-ignore
import { YourDashIcon } from "./iconDictionary.ts";

type COLOR = `#${ string }` | `rgb(${ string })` | `rgba(${ string })` | `var(--${ string })` | "currentColor"

export interface IIcon extends React.ComponentPropsWithoutRef<"div"> {
  icon: YourDashIcon;
  style?: CSSProperties;
  className?: string;
  color?: COLOR | string;
  useDefaultColor?: boolean;
}

const Icon: React.FC<IIcon> = ( {
  icon,
  style,
  className,
  color,
  useDefaultColor,
  ...genericProps
} ) => (
  <div
    {...genericProps}
    data-component-type-icon="true"
    style={{
      ...( useDefaultColor
        ? {
          backgroundImage: `url(${ icon })`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }
        : {
          WebkitMaskImage: `url(${ icon })`,
          WebkitMaskPosition: "center",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
          backgroundColor: color || "currentColor",
          maskImage: `url(${ icon })`,
          maskPosition: "center",
          maskRepeat: "no-repeat",
          maskSize: "cover"
        } ), ...style
    }}
    className={`${ styles.component } ${ className }`}
  />
);

export default Icon;
