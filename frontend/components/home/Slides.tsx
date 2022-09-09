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
      console.log(currentSlideInd);
      console.log(props.slides)
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
      <div className='w-max pl-2 pt-2 pb-2 pr-2 outline outline-2 outline-content-border bg-content-dark bottom-2 rounded-full absolute flex left-1/2 -translate-x-1/2'>
        {props.slides.map((slide, ind) => {
          return (
            <div
              key={ind}
              onClick={() => {
                setCurrentSlideInd(ind);
              }}
              className={`w-2 h-2 rounded-full mr-1 last:mr-0 cursor-pointer transition-colors ${
                currentSlideInd === ind
                  ? 'bg-text-primary'
                  : 'bg-text-inverted-secondary'
              }`}></div>
          );
        })}
      </div>
    </div>
  );
}
