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
import { useEffect, useState } from 'react';

export default function Slides(props: { slides: React.ReactChild[] }) {
  const [currentSlideInd, setCurrentSlideInd] = useState(0);
  useEffect(() => {
    let interval = setInterval(() => {
      if (currentSlideInd + 1 < props.slides.length)
        return setCurrentSlideInd(currentSlideInd + 1);
      setCurrentSlideInd(0);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  });
  return (
    <div className='overflow-hidden h-full w-full bg-content-dark rounded-2xl relative flex items-center justify-center text-text-primary text-3xl'>
      {props.slides[currentSlideInd]}
      <div
        className={
          '-translate-x-1/2 absolute bottom-2 left-1/2 flex items-center justify-center'
        }>
        <div
          className={
            'rounded-full bg-content-normal animate-expand-in-horizontal p-2.5 pl-3 pr-3 flex items-center justify-center overflow-hidden'
          }>
          {props.slides.map((slide, ind) => {
            return (
              <div
                key={ind}
                className={`p-1.5 pl-2.5 pr-2.5 rounded-full last:mr-0 first:ml-0 mr-1.5 ml-1.5 ${
                  currentSlideInd === ind
                    ? 'bg-branding-primary'
                    : 'bg-content-dark'
                } hover:scale-150 hover:outline-content-border outline-2 hover:outline transition-all cursor-pointer animate-fade-in opacity-0`}
                onClick={() => {
                  setCurrentSlideInd(ind);
                }}></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
