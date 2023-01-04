import styles from "./AppLayout.module.scss"
import Panel from "./panel/Panel";
import React, { useEffect, useState } from "react";

export interface IAppLayout {
  transparentBackground?: boolean;
}

const AppLayout: React.FC<IAppLayout> = ({
  children,
  transparentBackground
}) => {
  const [ appOpenAnimation, setAppOpenAnimation ] = useState(false)
  const [ applicationWindowMode, setApplicationWindowMode ] = useState(false)
  const [ standaloneInterface, setStandaloneInterface ] = useState(false)
  const [ hasLoaded, setHasLoaded ] = useState(false)

  useEffect(() => {
    const paramString = window.location.search
    const queryString = new URLSearchParams(paramString)

    setStandaloneInterface(queryString.get("standalone") === "true")
    setHasLoaded(true)
  }, [])
  
  if (!hasLoaded) return <></>

  return standaloneInterface ? <>{children}</> : <div className={styles.root}>
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