/*
 * Created on Sun Oct 23 2022-2023
 *
 * Copyright © 2022-2023 Ewsgit
 */

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SERVER, { verifyAndReturnJson } from "../../../server";
import { type YourDashUser } from "../../../../../packages/types/core/user";
import Chiplet from "ui";
import styles from "./Panel.module.scss";
import { type quickShortcut as QuickShortcut } from "types/core/panel/quickShortcut";
import ServerImage from "../../../pages/app/components/serverImage/ServerImage";
import PanelLauncherSlideOut from "./components/LauncherSlideOut/LauncherSlideOut";

export interface IPanel {
    backgroundImage: string;
}

const Panel: React.FC<IPanel> = ({ backgroundImage }) => {
    const router = useRouter();
    const [launcherSlideOutVisible, setLauncherSlideOutVisible] = useState(false);
    const [accountDropdownVisible, setAccountDropdownVisible] = useState(false);
    const [userData, setUserData] = useState(undefined as YourDashUser | undefined);
    const [quickShortcuts, setQuickShortcuts] = useState([] as QuickShortcut[]);

    useEffect(() => {
        verifyAndReturnJson(
            SERVER.get(`/userManagement/current/user`),
            (res: YourDashUser) => {
                setUserData(res);
            },
            () => {
                console.error(`error fetching user`);
                localStorage.removeItem("sessionToken");
                return router.push("/login");
            }
        );

        verifyAndReturnJson(
            SERVER.get(`/core/panel/quick-shortcuts/`),
            (res) => {
                setQuickShortcuts(res);
            },
            () => {
                console.error(`error fetching user's quick-shortcuts`);
            }
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.component}>
            <button
                type="button"
                className={styles.launcher}
                onClick={() => {
                    setLauncherSlideOutVisible(!launcherSlideOutVisible);
                }}
            >
                <Chiplet.Icon
                    name="app-launcher-16"
                    style={{
                        aspectRatio: "1/1",
                        height: "100%",
                    }}
                    color={"var(--app-panel-fg)"}
                />
            </button>
            <PanelLauncherSlideOut
                backgroundImage={backgroundImage}
                userNames={userData?.name || { first: "", last: "" }}
                setVisibility={(value: boolean) => {
                    setLauncherSlideOutVisible(value);
                }}
                visible={launcherSlideOutVisible}
                addQuickShortcut={(shortcut: QuickShortcut) => {
                    setQuickShortcuts([...quickShortcuts, shortcut]);
                }}
                userName={userData?.userName || "ERROR"}
            />
            <ServerImage
                onClick={() => {
                    if (router.pathname === `/app/dash`) return;
                    router.push(`/app/dash`);
                }}
                src={"/core/instance/logo"}
                className={styles.serverLogo}
            />
            {/* <h2 className={styles.serverName}>YourDash</h2> */}
            <div className={styles.shortcuts}>
                {quickShortcuts?.length !== 0 ? (
                    quickShortcuts?.map((shortcut) => {
                        return (
                            <Chiplet.RightClickMenu
                                key={shortcut.name}
                                items={[
                                    {
                                        name: "Open in new tab",
                                        onClick: () => {
                                            window.open(`${location.origin}/app/${shortcut.name}`);
                                        },
                                    },
                                    {
                                        name: "Remove quick shortcut",
                                        onClick: () => {
                                            verifyAndReturnJson(
                                                SERVER.delete(`/core/panel/quick-shortcut/${shortcut.id}`),
                                                () => {
                                                    setQuickShortcuts(
                                                        quickShortcuts.filter((sc) => {
                                                            return sc.id !== shortcut.id;
                                                        })
                                                    );
                                                },
                                                () => {
                                                    console.error(`unable to delete quick shortcut ${shortcut.id}`);
                                                }
                                            );
                                        },
                                    },
                                ]}
                            >
                                <button
                                    type="button"
                                    className={styles.shortcut}
                                    onClick={() => {
                                        setLauncherSlideOutVisible(false);
                                        if (shortcut.url === router.pathname) return;
                                        router.push(shortcut.url);
                                    }}
                                >
                                    <div>
                                        <img draggable={false} src={shortcut.icon} alt="" />
                                        {router.pathname === shortcut.url ? (
                                            <div data-active-indicator="true" />
                                        ) : (
                                            <div />
                                        )}
                                    </div>
                                    <span>{shortcut.name}</span>
                                </button>
                            </Chiplet.RightClickMenu>
                        );
                    })
                ) : (
                    <Chiplet.Button
                        onClick={() => {
                            verifyAndReturnJson(
                                SERVER.post(`/core/panel/quick-shortcut/create`, {
                                    body: JSON.stringify({
                                        name: "files",
                                        url: "/app/files",
                                    }),
                                }),
                                (data) => {
                                    setQuickShortcuts([...quickShortcuts, data[0]]);
                                },
                                () => {
                                    console.error(`unable to create quick shortcut with name: files`);
                                }
                            );
                        }}
                    >
                        Add default quick shortcuts
                    </Chiplet.Button>
                )}
            </div>
            {/* <div className={styles.tray}>
                 <Icon name="browser-16" className={styles.trayIcon} color={"var(--app-panel-fg)"} />
                 </div> */}
            <div className={styles.account}>
                <ServerImage
                    onClick={() => {
                        setAccountDropdownVisible(!accountDropdownVisible);
                    }}
                    tabIndex={0}
                    src={"/core/panel/user/profile/picture"}
                    alt=""
                />
                <button
                    type="button"
                    style={{
                        background: "#00000040",
                        height: "100vh",
                        left: 0,
                        opacity: accountDropdownVisible ? 1 : 0,
                        pointerEvents: accountDropdownVisible ? "all" : "none",
                        position: "fixed",
                        top: 0,
                        transition: "var(--transition)",
                        width: "100vw",
                    }}
                    onClick={() => {
                        setAccountDropdownVisible(false);
                    }}
                />
                <div>
                    <Chiplet.Card
                        style={{
                            opacity: !accountDropdownVisible ? "0" : "1",
                            pointerEvents: accountDropdownVisible ? "all" : "none",
                            transform: !accountDropdownVisible ? "scale(0.9)" : "scale(1)",
                        }}
                        compact
                        className={styles.accountDropdown}
                    >
                        <Chiplet.Row className={styles.accountDropdownQuickActions}>
                            <Chiplet.IconButton
                                icon="logout"
                                onClick={() => {
                                    setAccountDropdownVisible(false);
                                    localStorage.removeItem("sessiontoken");
                                    localStorage.removeItem("username");
                                    router.push("/login/");
                                }}
                            />
                            <Chiplet.IconButton
                                icon="info-16"
                                onClick={() => {
                                    setAccountDropdownVisible(false);
                                    router.push("/about");
                                }}
                            />
                            <Chiplet.IconButton
                                icon="gear-16"
                                onClick={() => {
                                    setAccountDropdownVisible(false);
                                    router.push("/app/settings");
                                }}
                            />
                        </Chiplet.Row>
                        <Chiplet.Column>
                            <Chiplet.Button
                                onClick={() => {
                                    router.push(`/app/user/profile/${userData?.userName}`);
                                    setAccountDropdownVisible(false);
                                }}
                            >
                                Profile
                            </Chiplet.Button>
                            <Chiplet.Button
                                onClick={() => {
                                    localStorage.removeItem("currentServer");
                                    router.push("/login/server");
                                    setAccountDropdownVisible(false);
                                }}
                            >
                                Switch instance
                            </Chiplet.Button>
                        </Chiplet.Column>
                    </Chiplet.Card>
                    <Chiplet.Column
                        className={styles.accountNotificationList}
                        style={{
                            opacity: !accountDropdownVisible ? "0" : "1",
                            pointerEvents: accountDropdownVisible ? "all" : "none",
                            transform: !accountDropdownVisible ? "scale(0.9)" : "scale(1)",
                        }}
                    >
                        <Chiplet.Card>
                            <Chiplet.Row data-header>
                                <img src={`/assets/productLogos/yourdash.svg`} alt="" />
                                <span>Notification Test</span>
                            </Chiplet.Row>
                            <Chiplet.Column>
                                <p>This is some sample text for a notification</p>
                                <Chiplet.Button
                                    onClick={() => {
                                        console.log("Implenment me!");
                                    }}
                                >
                                    Ok
                                </Chiplet.Button>
                            </Chiplet.Column>
                        </Chiplet.Card>
                        <Chiplet.Card>
                            <Chiplet.Row data-header>
                                <img src={`/assets/productLogos/yourdash.svg`} alt="" />
                                <span>Notification Test</span>
                            </Chiplet.Row>
                            <Chiplet.Column>
                                <p>This is some sample text for a notification</p>
                                <Chiplet.Button
                                    onClick={() => {
                                        console.log("Implenment me!");
                                    }}
                                >
                                    Ok
                                </Chiplet.Button>
                            </Chiplet.Column>
                        </Chiplet.Card>
                        <Chiplet.Card>
                            <Chiplet.Row data-header>
                                <img src={`/assets/productLogos/yourdash.svg`} alt="" />
                                <span>Notification Test</span>
                            </Chiplet.Row>
                            <Chiplet.Column>
                                <p>This is some sample text for a notification</p>
                                <Chiplet.Button
                                    onClick={() => {
                                        console.log("Implenment me!");
                                    }}
                                >
                                    Ok
                                </Chiplet.Button>
                            </Chiplet.Column>
                        </Chiplet.Card>
                    </Chiplet.Column>
                </div>
            </div>
        </div>
    );
};

export default Panel;
