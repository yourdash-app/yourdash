import React from "react"
import styles from "./BlankSetting.module.scss"
import Chiplet from "ui";

export interface IBlankSetting {
  title: string,
  description: string,
  children: React.ReactNode
}

const BlankSetting: React.FC<IBlankSetting> = ({
                                                 children, title, description
                                               }) => {
  return (
    <div className={ styles.component }>
      <Chiplet.Card>
        <Chiplet.Column>
          <h3>{title}</h3>
          <p>{description}</p>
        </Chiplet.Column>
        <div className={ styles.child }>
          {children}
        </div>
      </Chiplet.Card>
    </div>
  )
}

export default BlankSetting