/*
 * Created on Sun Oct 23 2022
 *
 * Copyright © 2022 Ewsgit
 */

import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import IncludedApps from '../../../../data/includedApps';
import SERVER from "../../../../lib/server";
import YourDashUser, { YourDashUserSettings } from '../../../../lib/user';
import Card from '../../../containers/card/Card';
import ColContainer from '../../../containers/ColContainer/ColContainer';
import RowContainer from '../../../containers/RowContainer/RowContainer';
import Button from '../../../elements/button/Button';
import Icon from '../../../elements/icon/Icon';
import RightClickMenu from '../../../elements/rightClickMenu/RightClickMenu';
import TextInput from '../../../elements/textInput/TextInput';
import AuthedImg from "./../../../elements/authedImg/AuthedImg";
import styles from './Panel.module.scss';

export interface IPanel { }

const Panel: React.FC<IPanel> = () => {
  const router = useRouter()
  const [ launcherSlideOutVisible, setLauncherSlideOutVisible ] = useState(false)
  const [ accountDropdownVisible, setAccountDropdownVisible ] = useState(false)
  const [ userData, setUserData ] = useState(undefined as YourDashUser | undefined)
  const [ userSettings, setUserSettings ] = useState(undefined as YourDashUserSettings | undefined)
  const [ searchQuery, setSearchQuery ] = useState("")

  useEffect(() => {
    SERVER.get(`/userManagement/current/user/settings`)
      .then((res) => {

        // if (res.status !== 200) throw new Error("Error while fetching data")
        // return res.json() as Promise<YourDashUserSettings>
        res.json().then((json: YourDashUserSettings) => {
          setUserSettings(json)
          document.body.style.setProperty("--app-panel-launcher-grid-columns", json.panel?.launcher?.slideOut?.gridColumns.toString() || "3")
        })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((_err) => {
        localStorage.removeItem("sessionToken")
        return router.push("/login")
      })
    SERVER.get(`/userManagement/current/user`)
      .then((res) => {

        // if (res.status !== 200) throw new Error("Error while fetching data, " + res)
        res.json()
          .then((res: { error?: boolean; user: YourDashUser }) => {
            if (res.error) return router.push("/login")
            setUserData(res.user)
          })
          .catch((err) => {
            console.error(err)
          })
      })
      .catch((_err) => {
        localStorage.removeItem("sessionToken")
        return router.push("/login")
      })
  }, [])

  return <div className={styles.component}>
    <div className={styles.launcher} onClick={() => {
      setLauncherSlideOutVisible(!launcherSlideOutVisible)
    }}>
      <Icon name='app-launcher-16' style={{
        height: "100%",
        aspectRatio: "1/1"
      }} color={"var(--app-panel-fg)"} />
    </div>
    <div className={`${styles.launcherSlideOut} ${launcherSlideOutVisible ? styles.launcherSlideOutVisible : ""}`}>
      <div data-header>
        <div data-title>Hiya, {userData?.name?.first}</div>
        <TextInput data-search onChange={(e) => {
          setSearchQuery(e.currentTarget.value.toLowerCase())
        }} placeholder="Search" />
      </div>
      <div className={styles.launcherGrid}>
        {
          IncludedApps.map((app, ind) => {
            if (app.name.toLowerCase().includes(searchQuery) || app.description.toLowerCase().includes(searchQuery))
              return <RightClickMenu
                items={[
                  {
                    name: "Pin to quick shortcuts",
                    onClick: () => {
                      console.log("IMPLEMENT ME!")
                    }
                  },
                ]} key={ind}>
                <div className={styles.launcherGridItem} onClick={() => {
                  setLauncherSlideOutVisible(false)
                  router.push(app.path)
                }}>
                  <img src={app.icon} draggable={false} alt="" />
                  <span>{app.name}</span>
                  {/* <div onClick={() => {
                  // show a dropdown
                }}><Icon name='three-bars-16' color={"var(--button-fg)"} /></div> */}
                </div>
              </RightClickMenu>
          })
        }
      </div>
      <footer data-footer>
        <img onClick={() => {
          router.push(`/app/user/profile/${userData?.userName}`)
        }} tabIndex={0} src={
          userData?.profile?.image
        } alt="" />
        <span>{userData?.name?.first} {userData?.name?.last}</span>
        <div onClick={() => {
          router.push("/app/settings")
        }} data-settings>
          <Icon name='gear-16' color={"var(--container-fg)"}></Icon>
        </div>
      </footer>
    </div>
    <AuthedImg src={"/core/instance/logo"} className={styles.serverLogo} />
    {/* <h2 className={styles.serverName}>YourDash</h2> */}
    <div className={styles.shortcuts}>
      {userSettings?.panel?.launcher?.shortcuts?.map((shortcut, ind) => {
        return <RightClickMenu key={ind} items={[
          {
            name: "a",
            onClick: () => {
              console.log("IMPLEMENT ME!")
            }
          }
        ]}>
          <div className={styles.shortcut} onClick={() => {
            router.push(shortcut.url)
          }}>
            <div>
              <img draggable={false} src={shortcut.icon} alt="" />
              {
                router.pathname === shortcut.url ?
                  <div data-active-indicator></div> : <div></div>
              }
            </div>
            <span>{shortcut.name}</span>
          </div>
        </RightClickMenu>
      })}
    </div>
    <div className={styles.tray}>
      <Icon name="browser-16" className={styles.trayIcon} color={"var(--app-panel-fg)"} />
    </div>
    <div className={styles.account}>
      <img onClick={() => {
        setAccountDropdownVisible(!accountDropdownVisible)
      }} tabIndex={0} src={
        userData?.profile?.image
      } alt="" />
      <div style={{
        width: "100vw",
        transition: "var(--transition)",
        height: "100vh",
        background: "#00000040",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: accountDropdownVisible ? "all" : "none",
        opacity: accountDropdownVisible ? 1 : 0
      }} onClick={() => {
        setAccountDropdownVisible(false)
      }}></div>
      <Card style={{
        opacity: !accountDropdownVisible ? "0" : "1",
        transform: !accountDropdownVisible ? "scale(0.9)" : "scale(1)",
        pointerEvents: !accountDropdownVisible ? "none" : "auto"
      }} compact={true} className={styles.accountDropdown}>
        <RowContainer className={styles.accountDropdownQuickActions}>
          <div onClick={() => {
            setAccountDropdownVisible(false)
            localStorage.removeItem("sessiontoken")
            localStorage.removeItem("username")
            router.push("/login/")
          }}>
            <Icon name='logout' color="var(--button-fg)" />
          </div>
          <div onClick={() => {
            setAccountDropdownVisible(false)
            router.push("/about")
          }}>
            <Icon name='info-16' color="var(--button-fg)" />
          </div>
          <div onClick={() => {
            setAccountDropdownVisible(false)
            router.push("/app/settings")
          }}>
            <Icon name='gear-16' color="var(--button-fg)" />
          </div>
        </RowContainer>
        <ColContainer>
          <Button onClick={() => {
            router.push(`/app/user/profile/${userData?.userName}`)
            setAccountDropdownVisible(false)
          }}>Profile</Button>
          <Button onClick={() => {
            localStorage.removeItem("currentServer")
            router.push("/login/server")
            setAccountDropdownVisible(false)
          }}>Switch instance</Button>
        </ColContainer>
      </Card>
    </div>
  </div>;
};

export default Panel;
