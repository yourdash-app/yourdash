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
import PanelLauncherSlideOut from "./components/Launcher/LauncherSlideOut";
import Launcher from "./components/Launcher/Launcher";
import Clock from "./components/Clock/Clock";

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
            <Launcher
                background={backgroundImage}
                userData={userData}
                quickShortcuts={quickShortcuts}
                setQuickShortcuts={(value) => {
                    setQuickShortcuts(value);
                }}
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
                                key={shortcut.id}
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
                                        {/* @ts-ignore */}
                                        <img draggable={false} src={shortcut?.icon} alt="" />
                                        {router.pathname.startsWith(shortcut.url) ? (
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
                    border: "none",
                }}
                onClick={() => {
                    setAccountDropdownVisible(false);
                }}
            />
            <Clock />
        </div>
    );
};

export default Panel;
