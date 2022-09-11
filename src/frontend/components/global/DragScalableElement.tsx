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

import React from "react";
import { triggerResizeEvent } from "../../lib/elementResize";

export default function DragScalableElement(props: {
  dragConfig: {
    scaleLeft?: boolean;
    scaleRight?: boolean;
    scaleTop?: boolean;
    scaleBottom?: boolean;
    startSizeX?: number;
    startSizeY?: number;
  };
  resetSize?: boolean;
  children: React.ReactChild | React.ReactChild[];
}) {
  const [size, setSize] = React.useState({ x: props.dragConfig.startSizeX || undefined, y: props.dragConfig.startSizeY || undefined });

  React.useEffect(() => {
    if (props.resetSize) {
      setSize({ x: props.dragConfig.startSizeX || undefined, y: props.dragConfig.startSizeY || undefined });
    }
  }, [props]);

  const handler = (mouseDownEvent: any, allowX: boolean, allowY: boolean, invert: boolean) => {
  const startSize = size;

    const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

    function onMouseMove(mouseMoveEvent: any) {
      setSize(currentSize => ({
        x: allowX ? startSize.x ? startSize.x - startPosition.x + mouseMoveEvent.pageX : startSize.x : undefined,
        y: allowY ? startSize.y ? startSize.y - startPosition.y + mouseMoveEvent.pageY : startSize.y : undefined,
      }));
      triggerResizeEvent()
    }

    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
  };
  return (
    <div className={`relative max-h-full max-w-full h-full w-full`} style={{ width: size.x, height: size.y }}>
      {props.children}
      {props.dragConfig.scaleRight ? (
        <div
          className={`w-2 h-full bg-transparent hover:bg-branding-primary active:bg-branding-active transition-colors cursor-col-resize absolute -right-1 top-0 z-40`}
          onMouseDown={e => {
            handler(e, true, false, false);
          }}></div>
      ) : null}
      {props.dragConfig.scaleLeft ? (
        <div
          className={`w-2 h-full bg-transparent hover:bg-branding-primary active:bg-branding-active transition-colors cursor-col-resize absolute -left-1 top-0 z-40`}
          onMouseDown={e => {
            handler(e, true, false, true);
          }}></div>
      ) : null}
      {props.dragConfig.scaleTop ? (
        <div
          className={`h-2 w-full bg-transparent hover:bg-branding-primary active:bg-branding-active transition-colors cursor-row-resize absolute left-0 -top-1 z-40`}
          onMouseDown={e => {
            handler(e, false, true, true);
          }}></div>
      ) : null}
      {props.dragConfig.scaleBottom ? (
        <div
          className={`h-2 w-full bg-transparent hover:bg-branding-primary active:bg-branding-active transition-colors cursor-row-resize absolute left-0 -bottom-1 z-40`}
          onMouseDown={e => {
            handler(e, false, true, false);
          }}></div>
      ) : null}
    </div>
  );
}
