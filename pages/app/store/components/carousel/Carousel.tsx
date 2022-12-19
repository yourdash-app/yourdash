import React, { useEffect, useRef, useState } from "react"
import Icon from "../../../../../components/elements/icon/Icon"
import styles from "./Carousel.module.scss"

export interface ICarousel {
  children: React.ReactChild[]
}

const Carousel: React.FC<ICarousel> = ({ children }) => {
  const pageRef = useRef<HTMLDivElement>(null)
  const [ indicator, setIndicator ] = useState(<></>)
  const [ scrollEvents, setScrollEvents ] = useState(0)

  useEffect(() => {
    if (!pageRef) return
    setIndicator(
      <div className={styles.indicator}>
        {
          children.map((_child, ind) => {
            if (!pageRef.current) {
              return <i key={ind}></i>
            }
            let container = pageRef.current as HTMLDivElement
            return <div key={ind} style={{
              backgroundColor: Math.round(container.scrollLeft / window.innerWidth) === ind ? "var(--container-fg)" : "var(--container-bg)"
            }}></div>
          })
        }
      </div>
    )
  }, [ pageRef, children, scrollEvents ])

  return <div className={styles.component}>
    <div className={styles.main} ref={pageRef} onScroll={() => setScrollEvents(scrollEvents + 1)}>
      {
        children
      }
    </div>
    <div className={styles.controls}>
      <button onClick={() => {
        if (!pageRef.current) return
        let container = pageRef.current as HTMLDivElement
        container.scrollBy({
          left: - window.innerWidth
        })
      }}>
        <Icon name="chevron-left-16" color="var(--button-fg)" />
      </button>
      <button onClick={() => {
        if (!pageRef.current) return
        let container = pageRef.current as HTMLDivElement
        container.scrollBy({
          left: window.innerWidth
        })
      }}>
        <Icon name="chevron-right-16" color="var(--button-fg)" />
      </button>
    </div>
    {indicator}
  </div>
}

export default Carousel