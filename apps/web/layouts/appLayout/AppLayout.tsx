import SERVER, { verifyAndReturnJson } from "../../server";
import styles from "./AppLayout.module.scss"
import Panel from "./panel/Panel";
import React, { useEffect, useState } from "react";

export interface IAppLayout {
  transparentBackground?: boolean;
  children: React.ReactNode;
}

const AppLayout: React.FC<IAppLayout> = ({ children, transparentBackground }) => {
  const [ appOpenAnimation, setAppOpenAnimation ] = useState(false)
  const [ applicationWindowMode, setApplicationWindowMode ] = useState(false)
  const [ standaloneInterface, setStandaloneInterface ] = useState(false)
  const [ hasLoaded, setHasLoaded ] = useState(false)
  const [ backgroundImage, setBackgroundImage ] = useState("")

  useEffect(() => {
    const paramString = window.location.search
    const queryString = new URLSearchParams(paramString)

    setStandaloneInterface(queryString.get("standalone") === "true")

    verifyAndReturnJson(
        SERVER.get(`/core/panel/background-image`),
        data => {
          setBackgroundImage(data.image)
          setApplicationWindowMode(true)
          setHasLoaded(true)
        },
        () => {
          console.error("unable to load user's background image")
        }
    )
  }, [])

  if (!hasLoaded) return <div/>

  return standaloneInterface
      ? (
          // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {children}
        </>
      ) : (
        <div className={ styles.root } style={ { backgroundImage: `url(${backgroundImage})` } }>
          <Panel
            backgroundImage={ `url(${backgroundImage})` }
            appIsOpening={ value => {
                  setAppOpenAnimation(value)
                } }
          />
          <div
            data-app-window={ applicationWindowMode }
            data-app-transparent-background={ transparentBackground }
            data-app-root-container="true"
            style={ { opacity: appOpenAnimation ? "0" : "1" } }
            className={ styles.content }
          >
            {children}
          </div>
        </div>
      )
};

export default AppLayout;
