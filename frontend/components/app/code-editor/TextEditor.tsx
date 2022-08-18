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

import React, { useEffect } from "react";
import COLOR from "../../../lib/color";
import { addResizeCallback } from "../../../lib/elementResize";
import createUuid from "../../../lib/libUuid";
import renderScrollBar from "./TextEditor/horizontalScrollBar";

let lines = [
  "Lorem, ipsum, dolor sit amet consectetur adipisicing elit.Iure, excepturi.",
  "Lorem, ipsum dolor, sit amet consectetur adipisicing elit.Ex obcaecati, asperiores nobis rem eius aliquam, nesciunt, velit dolores officiis voluptates dolore ?",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet conjhkag sdfhkjuasdfuiasdhgfsectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.",
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequaturhgjklasdffhjklasdhjkl.",
]

export default function TextEditor(props: {

}) {
  const editor_uuid = createUuid()
  useEffect(() => {
    const canvasContainer = document.getElementById("DEVDASH_TEXTEDITOR_CANVAS_CONTAINER_" + editor_uuid) as any as HTMLDivElement
    const canvas = document.getElementById("DEVDASH_TEXTEDITOR_CANVAS_" + editor_uuid) as any as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    let caretPos = {
      x: 0,
      y: 0
    }
    let PRESSED_KEYS: string[] = []
    window.addEventListener("keydown", (e) => {
      if (PRESSED_KEYS.indexOf(e.key) === -1) {
        PRESSED_KEYS.push(e.key)
      }
      if (PRESSED_KEYS.length === 1) {
        switch (PRESSED_KEYS[0]) {
          case "ArrowUp":
            caretPos.y++
            break;
          case "ArrowDown":
            caretPos.y--
            break;
          case "ArrowLeft":
            caretPos.x--
            break;
          case "ArrowRight":
            caretPos.x++
            break;
        }
        console.log(PRESSED_KEYS)
      }
    })
    window.addEventListener("keyup", (e) => {
      
    })
    let renderingOptions: TextEditorRenderingOptions = {
      caret: { ...caretPos, color: "#387" },
      topPadding: 10,
      leftPadding: 10,
      fontSize: 20,
      lineHeight: 25,
      theme: {
        line_number: {
          background: "#22428",
          foreground: "#747b82"
        },
        editor: {
          background: "#222428",
          foreground: "#fff"
        }
      },
      scrollbar: {
        horizontal: {
          background: "#666",
          size: 20,
        },
        vertical: {
          background: "#f66",
          size: 10
        }
      }
    }
    canvas.width = canvasContainer.getBoundingClientRect().width
    canvas.height = canvasContainer.getBoundingClientRect().height
    addResizeCallback(() => {
      canvas.width = canvasContainer.getBoundingClientRect().width
      canvas.height = canvasContainer.getBoundingClientRect().height
    })
    renderLoop(ctx, canvas, lines, renderingOptions)
  }, [ editor_uuid ]);
  return <div id={"DEVDASH_TEXTEDITOR_CANVAS_CONTAINER_" + editor_uuid}>
    <canvas tabIndex={0} id={"DEVDASH_TEXTEDITOR_CANVAS_" + editor_uuid}></canvas>
  </div>
}

export interface TextEditorRenderingOptions {
  caret: {
    x: number,
    y: number,
    color: COLOR
  },
  topPadding: number,
  leftPadding: number,
  fontSize: number,
  lineHeight: number,
  scrollbar: {
    horizontal: {
      size: number,
      background: COLOR
    },
    vertical: {
      size: number,
      background: COLOR
    }
  }
  theme: {
    line_number: {
      background: COLOR,
      foreground: COLOR
    },
    editor: {
      background: COLOR,
      foreground: COLOR
    }
  }
}

function renderLoop(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, lines: string[], options: TextEditorRenderingOptions) {
  ctx.font = options.fontSize + "px JetBrains Mono"
  let lineCountWidth = 16;
  lineCountWidth += ctx.measureText("0").width

  function setLineCountWidth(currentWidth: number, ind: number): number {
    if (ind > 9) {
      currentWidth += ctx.measureText("0").width
      ind = ind / 10
      return setLineCountWidth(currentWidth, ind)
    }
    return currentWidth
  }

  lineCountWidth = setLineCountWidth(lineCountWidth, lines.length)

  let ORIGIN = {
    x: options.leftPadding + lineCountWidth,
    y: options.topPadding
  }
  ctx.fillStyle = options.theme.editor.background
  ctx.fillRect(options.leftPadding, 0, canvas.width, canvas.height)
  ctx.fillStyle = options.theme.line_number.background
  ctx.fillRect(0, 0, lineCountWidth, canvas.height)

  lines.map((line, lineInd) => {
    lineInd = lineInd + 1
    ctx.fillStyle = options.theme.line_number.foreground
    ctx.fillText("" + lineInd, 8, ORIGIN.y + (options.lineHeight * lineInd))
    ctx.fillStyle = options.theme.editor.foreground
    ctx.fillText(line, ORIGIN.x, ORIGIN.y + (options.lineHeight * lineInd))
  })

  let caretPos = options.caret

  ctx.fillStyle = options.caret.color
  ctx.fillRect(
    ORIGIN.x + ctx.measureText(lines[ caretPos.y ].substring(0, caretPos.x)).width,
    ORIGIN.y + (options.lineHeight * (caretPos.y )) + (options.lineHeight / 4),
    ctx.measureText("0").width / 4,
    options.lineHeight
  )
  renderScrollBar(canvas, ctx, options, lines)
  window.requestAnimationFrame(() => renderLoop(ctx, canvas, lines, options))
}