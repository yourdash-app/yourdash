/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import { CSSProperties } from 'react';
import YourDashIcon, { YourDashIconRawDictionary } from './iconDictionary';
import COLOR from '../../../lib/color';
import CSSVariable from '../../../lib/cssVariable';

export default function Icon(props: {
  name: YourDashIcon;
  style?: CSSProperties;
  className?: string;
  color?: COLOR | CSSVariable;
  useDefaultColor?: boolean;
}) {
  return (
    <div
      style={{
        ...props.style,
        ...(props.useDefaultColor
          ? {
            backgroundImage: `url(${YourDashIconRawDictionary[ props.name ]})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }
          : {
            maskImage: `url(${YourDashIconRawDictionary[ props.name ]})`,
            WebkitMaskImage: `url(${YourDashIconRawDictionary[ props.name ]})`,
            backgroundColor: props.color || "#ff0000",
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
            maskSize: 'cover',
            WebkitMaskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'cover',
          }),
        ...{
          userSelect: "none"
        }
      }}
      className={props.className}
    />
  );
}