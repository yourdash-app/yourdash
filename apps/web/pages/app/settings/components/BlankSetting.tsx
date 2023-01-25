import React from "react"
import Card from "ui/containers/card/Card"
import ColContainer from "ui/containers/ColContainer/ColContainer"
import styles from "./BlankSetting.module.scss"

export interface IBlankSetting {
  title: string,
  description: string
}

const BlankSetting: React.FC<IBlankSetting> = ({
                                                 children, title, description
                                               }) => (
                                                 <div className={styles.component}>
                                                   <Card>
                                                     <ColContainer>
                                                       <h3>{title}</h3>
                                                       <p>{description}</p>
                                                     </ColContainer>
                                                     <div className={styles.child}>
                                                       {children}
                                                     </div>
                                                   </Card>
                                                 </div>
)

export default BlankSetting