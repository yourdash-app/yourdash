/*
 * Created on Sun Oct 23 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useEffect, useState } from 'react';
import Icon from '../../../elements/icon/Icon';
import styles from './Panel.module.css';
import Server from "./../../../../lib/server"
import YourDashUser from '../../../../lib/user';
import AuthedImg from "./../../../elements/authedImg/AuthedImg"

export interface IPanel { }

const Panel: React.FC<IPanel> = () => {
  const [ serverConfig, setServerConfig ] = useState({} as { [ key: string ]: any | undefined })
  const [ launcherSlideOutVisible, setLauncherSlideOutVisible ] = useState(false)
  const [ userData, setUserData ] = useState(undefined as YourDashUser | undefined)
  useEffect(() => {
    Server.get(`/get/server/config`)
      .then(res => res.json())
      .then(res => {
        setServerConfig(res)
      })
    Server.get(`/get/current/user`)
      .then(res => res.json())
      .then(res => { 
        setUserData(res)
      })
    // TODO: set userData to the result and add the endpoint to the server backend.
  }, [])
  return <div className={styles.component}>
    <div className={styles.launcher} onClick={() => { setLauncherSlideOutVisible(!launcherSlideOutVisible) }}>
      <Icon name='app-launcher-16' style={{ height: "100%", aspectRatio: "1/1" }} color={"var(--panel-fg)"} />
    </div>
    <div className={`${styles.launcherSlideOut} ${launcherSlideOutVisible ? styles.launcherSlideOutVisible : ""}`}></div>
    <AuthedImg src={"/get/logo"} className={styles.serverLogo} />
    <div className={styles.tray}></div>
    <div className={styles.account}>
      <img src={
        userData?.profile.image
      } alt="" />
    </div>
  </div>;
};

export default Panel;
