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

import React, { useEffect, useRef } from 'react';
import COLOR from '../../../../shared_types/Color';
import {
  addResizeCallback,
  removeResizeCallback
} from '../../../lib/elementResize';
import createUuid from '../../../lib/libUuid';
import renderScrollBar from './TextEditor/horizontalScrollBar';
import TextEditorOptions from './../../../../shared_types/TextEditorOptions';
import renderLine from './TextEditor/RenderLine';

let lines = [
  'Lorem, ipsum, dolor sit amet consectetur adipisicing elit.Iure, excepturi.',
  'Lorem, ipsum dolor, sit amet consectetur adipisicing elit.Ex obcaecati, asperiores nobis rem eius aliquam, nesciunt, velit dolores officiis voluptates dolore ?',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet conjhkag sdfhkjuasdfuiasdhgfsectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequatur.',
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, consequaturhgjklasdffhjklasdhjkl.'
];

export default function TextEditor(props: {}) {
  const editor_uuid = createUuid();
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  useEffect(() => {
    if (!canvasRef) return;
    const canvasContainer = canvasContainerRef.current as any as HTMLDivElement;
    const canvas = canvasRef.current as any as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    let caretPos = {
      x: 0,
      y: 0
    };
    let renderingOptions: TextEditorOptions = {
      caret: { ...caretPos, color: '#387' },
      topPadding: 10,
      leftPadding: 10,
      fontSize: 30,
      lineHeight: 25,
      theme: {
        line_number: {
          background: '#22428',
          foreground: '#747b82'
        },
        editor: {
          background: '#222428',
          foreground: '#fff'
        }
      },
      scrollbar: {
        horizontal: {
          background: '#666',
          size: 20
        },
        vertical: {
          background: '#f66',
          size: 10
        }
      }
    };
    let canvasUpdateSize = () => {
      canvas.width = canvasContainer.getBoundingClientRect().width;
      canvas.height = canvasContainer.getBoundingClientRect().height;
      ctx.fillStyle = renderingOptions.theme.editor.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      console.log(canvasContainer.getBoundingClientRect().width);
      renderLine(
        [
          { value: 'This', type: 'keyword', color: '#ff00ff' },
          { value: 'is', type: 'keyword', color: '##00ff00' },
          { value: 'a', type: 'keyword', color: '#0000ff' },
          { value: 'test', type: 'keyword', color: '#ff0000' }
        ],
        50,
        canvas,
        renderingOptions
      );
    };
    canvasUpdateSize();
    window.addEventListener('resize', canvasUpdateSize);
    addResizeCallback(canvasUpdateSize);
    ctx.fillStyle = renderingOptions.theme.editor.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    return () => {
      window.removeEventListener('resize', canvasUpdateSize);
      removeResizeCallback(canvasUpdateSize);
    };
  }, []);
  return (
    <div
      className='w-full h-full'
      ref={canvasContainerRef}>
      <canvas
        tabIndex={0}
        ref={canvasRef}
      />
    </div>
  );
}
