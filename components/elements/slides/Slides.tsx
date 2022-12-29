import React from 'react';
import styles from './Slides.module.css';

export interface ISlides {
  slides: React.ReactChild[];
  changeDuration: number;
}

const Slides: React.FC<ISlides> = ({
  slides, changeDuration 
}) => {
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
        return <div key={ind} className={currentSlideInd === ind ? styles.active : ""} onClick={() => {
          setCurrentSlideInd(ind); setCurrentSlide(slides[ ind ])
        }}></div>
      })}
    </div>
  </div>;
};

export default Slides