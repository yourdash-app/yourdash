import React, { useEffect, useRef, useState } from "react"
import Icon from "ui/icon/Icon"
import styles from "./Carousel.module.scss"

export interface ICarousel extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactChild[] | React.ReactChild,
  className?: string,
}

const Carousel: React.FC<ICarousel> = ({
                                         children, className, ...extraProps
                                       }) => {
  const pageRef = useRef<HTMLDivElement>(null)
  const [ indicator, setIndicator ] = useState(<></>)
  const [ scrollEvents, setScrollEvents ] = useState(0)

  useEffect(() => {
    if (!pageRef) return
    setIndicator(
      <div className={styles.indicator}>
        {
            children instanceof Array ?
                children.map((_child, ind) => {
                  if (!pageRef.current) {
                    return <i key={ind}/>
                  }
                  const container = pageRef.current as HTMLDivElement
                  return (
                    <div
                      key={ind}
                      style={{ backgroundColor: Math.round(container.scrollLeft / window.innerWidth) === ind ? "var(--container-fg)" : "var(--container-bg)" }}
                    />
                  )
                })
                : (
                  <div style={{
                      backgroundColor: Math.round((pageRef?.current?.scrollLeft || 0) / window.innerWidth) === 0 ?
                          "var(--container-fg)"
                          : "var(--container-bg)"
                    }}
                  />
                )
          }
      </div>
    )
  }, [ pageRef, children, scrollEvents ])

  return (
    <div {...extraProps} className={`${styles.component} ${className}`}>
      <div className={styles.main} ref={pageRef} onScroll={() => setScrollEvents(scrollEvents + 1)}>
        {
            children
          }
      </div>
      <div className={styles.controls}>
        {
            children instanceof Array ? (
              <>
                <button onClick={() => {
                        if (!pageRef.current) return
                        const container = pageRef.current as HTMLDivElement
                        container.scrollBy({ left: -window.innerWidth })
                      }}
                >
                  <Icon name="chevron-left-16" color="var(--button-fg)"/>
                </button>
                <button onClick={() => {
                        if (!pageRef.current) return
                        const container = pageRef.current as HTMLDivElement
                        container.scrollBy({ left: window.innerWidth })
                      }}
                >
                  <Icon name="chevron-right-16" color="var(--button-fg)"/>
                </button>
              </>
                )
                : null
          }
      </div>
      {indicator}
    </div>
  )
}

export default Carousel