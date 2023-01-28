import React from "react";
import styles from "./Dialog.module.scss"

const Dialog: React.FC = ({ children }) => (
  <div className={styles.component}>
    <section className={styles.handle}>
      <div/>
    </section>
    <section className={styles.content}>
      {children}
    </section>
  </div>
)

export default Dialog