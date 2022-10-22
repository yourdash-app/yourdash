/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import { useEffect, useState } from 'react';
import Icon from '../../../elements/icon/Icon';
import styles from './Panel.module.css';
import Server from "./../../../../lib/server"
import YourDashUser from '../../../../lib/user';

export interface IPanel { }

const Panel: React.FC<IPanel> = () => {
  const [ serverConfig, setServerConfig ] = useState({} as { [ key: string ]: any | undefined })
  const [ serverLogo, setServerLogo ] = useState(require("./../../../../public/assets/productLogos/yourdash.svg"))
  const [ launcherSlideOutVisible, setLauncherSlideOutVisible ] = useState(false)
  const [ userData, setUserData ] = useState(undefined as YourDashUser | undefined)
  useEffect(() => {
    setServerLogo(`${localStorage.getItem("currentServer")}/api/get/logo`)
    Server.get(`/get/server/config`)
      .then(res => res.json())
      .then(res => {
        setServerConfig(res)
      })
    Server.get(`/get/current/user`)
      .then(res => res.json())
    // TODO: set userData to the result and add the endpoint to the server backend.
  }, [])
  useEffect(() => {
    Server.get("/get/server/default/background")
  }, [ serverConfig ])
  return <div className={styles.component}>
    <div className={styles.launcher} onClick={() => { setLauncherSlideOutVisible(!launcherSlideOutVisible) }}>
      <Icon name='app-launcher-16' style={{ height: "100%", aspectRatio: "1/1" }} color={"var(--panel-fg)"} />
    </div>
    <div className={`${styles.launcherSlideOut} ${launcherSlideOutVisible ? styles.launcherSlideOutVisible : ""}`}></div>
    <img src={serverLogo} className={styles.serverLogo} alt="" />
    <div className={styles.tray}></div>
    <div className={styles.account}>
      <img src={
        userData?.profile.image
      } alt="" />
    </div>
  </div>;
};

export default Panel;
