import React from "react";
import styles from "./Dialog.module.scss"

const Dialog: React.FC = ({ children }) => (
  <div className={styles.component}>
    <section className={styles.handle}>
      <div/>
    </section>
    {children}
  </div>
)

export default Dialog