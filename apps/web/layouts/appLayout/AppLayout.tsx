import SERVER, { verifyAndReturnJson } from "../../server";
import RightClickMenuRootContainer from "ui/backup/elements/rightClickMenu/RightClickMenuRootContainer";
import styles from "./AppLayout.module.scss"
import Panel from "./panel/Panel";
import React, { ReactNode, useEffect, useState } from "react";

export interface IAppLayout {
  transparentBackground?: boolean;
  children: ReactNode | undefined;
}

const AppLayout: React.FC<IAppLayout> = ({
                                           children,
                                           transparentBackground
                                         }) => {
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

  if (!hasLoaded) return <></>

  return standaloneInterface
      ? (
        <RightClickMenuRootContainer>
          {children}
        </RightClickMenuRootContainer>
      )
      : (
        <RightClickMenuRootContainer>
          <div className={styles.root} style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Panel
              backgroundImage={`url(${backgroundImage})`}
              appIsOpening={value => {
                    setAppOpenAnimation(value)
                  }}
            />
            <div
              data-app-window={applicationWindowMode}
              data-app-transparent-background={transparentBackground}
              data-app-root-container
              style={{ opacity: appOpenAnimation ? "0" : "1" }}
              className={styles.content}
            >
              {children}
            </div>
          </div>
        </RightClickMenuRootContainer>
      )
};

export default AppLayout;