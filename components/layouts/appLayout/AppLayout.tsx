import styles from "./AppLayout.module.scss"
import Panel from "./panel/Panel";
import React, { useState } from "react";

export interface IAppLayout extends React.ComponentPropsWithoutRef<'div'> {
  transparentBackground?: boolean;
}

const AppLayout: React.FC<IAppLayout> = ({
  children,
  transparentBackground,
  ..._divProps 
}) => {
  const [ appOpenAnimation, setAppOpenAnimation ] = useState(false)
  const [ applicationWindowMode, setApplicationWindowMode ] = useState(false)

  return <div className={styles.root}>
    <Panel
      appIsOpening={(value) => {
        setAppOpenAnimation(value)
      }}
      setApplicationWindowMode={(value) => setApplicationWindowMode(value)}
    />
    <div data-app-window={applicationWindowMode} data-app-transparent-background={transparentBackground} data-app-root-container style={{ opacity: appOpenAnimation ? "0" : "1", }}
      className={styles.content}>
      {children}
    </div>
  </div>
};

export default AppLayout;