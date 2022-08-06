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
import { addResizeCallback } from "../../../lib/elementResize";
import createUuid from "../../../lib/libUuid";

export default function TextEditor(props: {

}) {
  const editor_uuid = createUuid()
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
  useEffect(() => {
    const canvasContainer = document.getElementById("DEVDASH_TEXTEDITOR_CANVAS_CONTAINER_" + editor_uuid) as any as HTMLDivElement
    const canvas = document.getElementById("DEVDASH_TEXTEDITOR_CANVAS_" + editor_uuid) as any as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    let PRESSED_KEYS: string[] = []
    canvas.addEventListener("keydown", (e) => {
      if (PRESSED_KEYS.indexOf(e.key) === -1) {
        PRESSED_KEYS.push(e.key)
      }
    })
    canvas.addEventListener("keyup", (e) => {
      // @ts-ignore
      PRESSED_KEYS = PRESSED_KEYS.map(key => {
        if (e.key !== key) {
          return key
        }
      })
    })
    let renderingOptions: CanvasRenderingOptions = {
      cursorPosition: {
        x: 10,
        y: 6
      },
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
      }
    }
    canvas.width = canvasContainer.getBoundingClientRect().width
    canvas.height = canvasContainer.getBoundingClientRect().height
    addResizeCallback(() => {
      canvas.width = canvasContainer.getBoundingClientRect().width
      canvas.height = canvasContainer.getBoundingClientRect().height
      renderLoop(ctx, canvas, lines, renderingOptions)
    })
    renderLoop(ctx, canvas, lines, renderingOptions)
  }, [ editor_uuid, lines ]);
  return <div id={"DEVDASH_TEXTEDITOR_CANVAS_CONTAINER_" + editor_uuid}>
    <canvas id={"DEVDASH_TEXTEDITOR_CANVAS_" + editor_uuid}></canvas>
  </div>
}

interface CanvasRenderingOptions {
  cursorPosition: {
    x: number,
    y: number
  },
  topPadding: number,
  leftPadding: number,
  fontSize: number,
  lineHeight: number,
  theme: {
    line_number: {
      background: string,
      foreground: string
    },
    editor: {
      background: string,
      foreground: string
    }
  }
}

function renderLoop(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, lines: string[], options: CanvasRenderingOptions) {
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

  let cursorPos = options.cursorPosition

  ctx.fillStyle = "#f00"
  ctx.fillRect(
    ORIGIN.x + ctx.measureText(lines[ cursorPos.y - 1 ].substring(0, cursorPos.x)).width,
    ORIGIN.y + (options.lineHeight * (cursorPos.y - 1)) + (options.lineHeight / 4),
    ctx.measureText("0").width / 4,
    options.lineHeight
  )
}