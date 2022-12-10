import React, { useEffect, useRef, useState } from "react"
import Icon from "../../../../../components/elements/icon/Icon"
import styles from "./Carousel.module.scss"

export interface ICarousel {
  children: React.ReactChild[]
}

const Carousel: React.FC<ICarousel> = ({ children }) => {
  const ref = useRef(null)
  const [ indicator, setIndicator ] = useState(<></>)

  useEffect(() => {
    setIndicator(
      <div className={styles.indicator}>
        {children.map((_child, ind) => {
          console.log(ref)
          if (!ref.current) {
            return <i></i>
          }
          let container = ref.current as HTMLDivElement
          console.log((container.scrollLeft / container.scrollWidth));
          return <div key={ind} style={{
            backgroundColor: (container.scrollLeft / container.scrollWidth) === ind ? "var(--container-fg)" : "var(--container-bg)"
          }}></div>
        })
        }
      </div>
    )
  }, [ ref ])

  return <div className={styles.component}>
    <div className={styles.main} ref={ref}>
      {
        children
      }
    </div>
    <div className={styles.controls}>
      <button onClick={() => {
        if (!ref.current) return
        let container = ref.current as HTMLDivElement
        container.scrollBy({ left: - window.innerWidth })
      }}>
        <Icon name="chevron-left-16" color="var(--button-fg)" />
      </button>
      <button onClick={() => {
        if (!ref.current) return
        let container = ref.current as HTMLDivElement
        container.scrollBy({ left: window.innerWidth })
      }}>
        <Icon name="chevron-right-16" color="var(--button-fg)" />
      </button>
    </div>
    {indicator}
  </div>
}

export default Carousel