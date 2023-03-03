import styles from "../../Panel.module.scss";
import Chiplet from "ui";
import SERVER, { verifyAndReturnJson } from "../../../../../server";
import ServerImage from "../../../../../pages/app/components/serverImage/ServerImage";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { type LauncherApplication } from "types/core/panel/launcherApplication";
import { quickShortcut } from "types/core/panel/quickShortcut";

export interface IPanelLauncherSlideOut {
    visible: boolean;
    setVisibility: (visible: boolean) => void;
    backgroundImage: string;
    userNames: { first: string; last: string };
    addQuickShortcut: (shortcut: quickShortcut) => void;
    userName: string;
}

const PanelLauncherSlideOut: React.FC<IPanelLauncherSlideOut> = ({
    visible,
    backgroundImage,
    userNames,
    setVisibility,
    addQuickShortcut,
    userName,
}) => {
    const router = useRouter();
    const [installedApps, setInstalledApps] = useState([] as LauncherApplication[]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        verifyAndReturnJson(
            SERVER.get(`/core/panel/launcher/apps`),
            (res: LauncherApplication[]) => {
                setInstalledApps(res);
            },
            () => {
                console.error(`error fetching the instance's installed apps`);
            }
        );
    }, []);

    return (
        <div className={`${styles.launcherSlideOut} ${visible ? styles.launcherSlideOutVisible : ""}`}>
            <div data-header="true" style={{ backgroundImage }}>
                <div data-title="true">Hiya, {userNames.first}</div>
                <Chiplet.TextInput
                    data-search
                    onChange={(e) => {
                        setSearchQuery(e.currentTarget.value.toLowerCase());
                    }}
                    placeholder="Search"
                />
            </div>
            <div className={styles.launcherGrid}>
                {installedApps ? (
                    installedApps.map((app) => {
                        if (
                            app?.name?.toLowerCase()?.includes(searchQuery) ||
                            app?.description?.toLowerCase()?.includes(searchQuery)
                        )
                            return (
                                <Chiplet.RightClickMenu
                                    items={[
                                        {
                                            name: "Pin to quick shortcuts",
                                            onClick: () => {
                                                verifyAndReturnJson(
                                                    SERVER.post(`/core/panel/quick-shortcut/create`, {
                                                        body: JSON.stringify({
                                                            name: app.name,
                                                            url: app.path,
                                                        }),
                                                    }),
                                                    (data) => {
                                                        addQuickShortcut(data[0]);
                                                    },
                                                    () => {
                                                        console.error(
                                                            `unable to create quick shortcut with name: ${app.name}`
                                                        );
                                                    }
                                                );
                                            },
                                        },
                                        {
                                            name: "Open in new tab",
                                            onClick: () => {
                                                window.open(`${location.origin}/app/${app.name}`);
                                            },
                                        },
                                    ]}
                                    key={app.name}
                                >
                                    <Chiplet.Card
                                        className={styles.launcherGridItem}
                                        onClick={() => {
                                            if (app.path === router.pathname) return setVisibility(false);
                                            setVisibility(false);
                                            router.push(app.path);
                                        }}
                                    >
                                        <img src={app.icon} draggable={false} alt="" />
                                        <span className={`${app.underDevelopment && styles.underDevelopment}`}>
                                            {app.displayName}
                                        </span>
                                    </Chiplet.Card>
                                </Chiplet.RightClickMenu>
                            );
                    })
                ) : (
                    <Chiplet.Button
                        onClick={() => {
                            router.reload();
                        }}
                    >
                        Reload Launcher Items
                    </Chiplet.Button>
                )}
            </div>
            <footer data-footer="true">
                <ServerImage
                    onClick={() => {
                        router.push(`/app/user/profile/${userName}`);
                    }}
                    tabIndex={0}
                    src={"/core/panel/user/profile/picture"}
                    alt=""
                />
                <span>
                    {userNames?.first} {userNames?.last}
                </span>
                <Chiplet.IconButton
                    icon="gear-16"
                    color={"var(--container-fg)"}
                    onClick={() => {
                        setVisibility(false);
                        router.push("/app/settings");
                    }}
                />
            </footer>
        </div>
    );
};

export default PanelLauncherSlideOut;
