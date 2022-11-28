import styles from "./AppLayout.module.css"
import Panel from "./panel/Panel";
import React from "react";

export interface IAppLayout extends React.ComponentPropsWithoutRef<'div'> { }

const AppLayout: React.FC<IAppLayout> = ({ children, ..._divProps }) => {
  return <div className={styles.root}>
    <Panel />
    <div className={styles.content}>
      {children}
    </div>
  </div>
};

export default AppLayout;