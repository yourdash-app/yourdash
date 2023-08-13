import styles from "./Spinner.module.scss"
import React, { CSSProperties } from "react"

export interface ISpinner {
  style?: CSSProperties
}

const Spinner: React.FC<ISpinner> = ( { style } ) => {
  return (
    <div className={ styles.component } style={ style }>
      <section className={ styles.container }>
        <div className={ styles.spinnerBorder }/>
        <div className={ styles.spinnerBack }/>
        <div className={ styles.spinnerCutoutContainer }>
          <div className={ styles.spinnerCutoutOne }/>
          <div className={ styles.spinnerCutoutTwo }/>
        </div>
      </section>
    </div>
  )
}

export default Spinner
