/*
 * Created on Sun Oct 23 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useEffect, useState } from 'react';
import YourDashUser from '../../../../lib/user';
import ColContainer from '../../../containers/ColContainer/ColContainer';
import Button from '../../../elements/button/Button';
import Card from '../../../elements/card/Card';
import FloatingLabel from '../../../elements/floatingLabel/FloatingLabel';
import Icon from '../../../elements/icon/Icon';
import Server from "./../../../../lib/server";
import AuthedImg from "./../../../elements/authedImg/AuthedImg";
import styles from './Panel.module.css';

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
      .then(res => res.json() as Promise<YourDashUser>)
      .then(res => {
        setUserData(res)
        document.body.style.setProperty("--panel-launcher-grid-columns", res.settings.panel?.launcher?.slideOut?.gridColumns.toString() || "3")
      })
  }, [])
  return <div className={styles.component}>
    <div className={styles.launcher} onClick={() => { setLauncherSlideOutVisible(!launcherSlideOutVisible) }}>
      <Icon name='app-launcher-16' style={{ height: "100%", aspectRatio: "1/1" }} color={"var(--panel-fg)"} />
    </div>
    <div className={`${styles.launcherSlideOut} ${launcherSlideOutVisible ? styles.launcherSlideOutVisible : ""}`}>
      <div data-title>Hello, {userData?.name}</div>
      <div className={styles.launcherGrid}>
        {/* for loop this on load */}
        <div>
          <img src={require("./../../../../public/assets/productLogos/yourdash.svg").default.src} draggable={false} alt="" />
          <span>App 1 Name</span>
        </div>
        <div>
          <img src={require("./../../../../public/assets/productLogos/yourdash.svg").default.src} alt="" />
          <span>App 2 Name</span>
        </div>
        <div>
          <img src={require("./../../../../public/assets/productLogos/yourdash.svg").default.src} alt="" />
          <span>App 3 Name</span>
        </div>
        <div>
          <img src={require("./../../../../public/assets/productLogos/yourdash.svg").default.src} alt="" />
          <span>App 4 Name</span>
        </div>
        <div>
          <img src={require("./../../../../public/assets/productLogos/yourdash.svg").default.src} alt="" />
          <span>App 5 Name</span>
        </div>
        <div>
          <img src={require("./../../../../public/assets/productLogos/yourdash.svg").default.src} alt="" />
          <span>App 6 Name</span>
        </div>
      </div>
    </div>
    <AuthedImg src={"/get/logo"} className={styles.serverLogo} />
    <div className={styles.tray}></div>
    <div className={styles.account}>
      <img src={
        userData?.profile.image
      } alt="" />
      <FloatingLabel>{"${username}"}</FloatingLabel>
      <Card compact={true} className={styles.accountDropdown}>
        <ColContainer>
          <Button onClick={() => {
            console.log("Profile")
          }}>Profile</Button>
          <Button onClick={() => {
            console.log("Settings")
          }}>Settings</Button>
          <Button onClick={() => {
            console.log("Logout")
          }}>Logout</Button>
        </ColContainer>
      </Card>
    </div>
  </div>;
};

export default Panel;
