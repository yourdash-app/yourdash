import styles from "./AppLayout.module.scss"
import Panel from "./panel/Panel";
import React, { useEffect, useState } from "react";

export interface IAppLayout {
  transparentBackground?: boolean;
  children: React.ReactNode;
}

const AppLayout: React.FC<IAppLayout> = ({ children, transparentBackground }) => {
  const [ applicationWindowMode, setApplicationWindowMode ] = useState(false)
  const [ standaloneInterface, setStandaloneInterface ] = useState(false)
  const [ backgroundImageUrl, setBackgroundImageUrl ] = useState("")
  useEffect(() => {
    const queryString = new URLSearchParams(window.location.search)

    setStandaloneInterface(queryString.get("standalone") === "true")
    setApplicationWindowMode(false)

    setBackgroundImageUrl(`${localStorage.getItem("currentServer") as string}/api/core/panel/background-image/${localStorage.getItem("username") as string}/${localStorage.getItem("sessiontoken")!.slice(0, 10) as string}`)
  }, [])

  return standaloneInterface
      ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {children}
        </>
      ) : (
        <div className={ styles.root } style={ { backgroundImage: `url(${backgroundImageUrl})` } }>
          <Panel
            backgroundImage={ `url(${backgroundImageUrl})` }
          />
          <div
            data-app-window={ applicationWindowMode }
            data-app-transparent-background={ transparentBackground }
            data-app-root-container="true"
            className={ styles.content }
          >
            {children}
          </div>
        </div>
      )
};

export default AppLayout;
