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

import React from 'react';
import styles from './Slides.module.css';

export interface ISlides {
  slides: React.ReactChild[];
  changeDuration: number;
}

const Slides: React.FC<ISlides> = ({ slides, changeDuration }) => {
  const [ currentSlideInd, setCurrentSlideInd ] = React.useState(0)
  const [ currentSlide, setCurrentSlide ] = React.useState(slides[ 0 ])

  React.useEffect(() => {
    let intervalTimer = setInterval(() => {
      setCurrentSlideInd(currentSlideInd + 1)
      setCurrentSlide(slides[ currentSlideInd + 1 ])
      if (currentSlideInd >= slides.length - 1) {
        setCurrentSlideInd(0)
        setCurrentSlide(slides[ 0 ])
      }
    }, changeDuration)
    return () => {
      clearInterval(intervalTimer)
    }
  })

  return <div className={styles.component}>
    {currentSlide}
    <div className={styles.statusIndicator}>
      {slides.map((_slide, ind) => {
        return <div key={ind} className={currentSlideInd === ind ? styles.active : ""} onClick={() => { setCurrentSlideInd(ind); setCurrentSlide(slides[ ind ]) }}></div>
      })}
    </div>
  </div>;
};

export default Slides