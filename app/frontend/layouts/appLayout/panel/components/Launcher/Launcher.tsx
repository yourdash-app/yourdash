import React, { useState } from "react";
import styles from "../../Panel.module.scss";
import Chiplet from "~/chipletui";
import PanelLauncherSlideOut from "./LauncherSlideOut";
import {
    quickShortcut,
    quickShortcut as QuickShortcut,
} from "../../../../../../../packages/types/core/panel/quickShortcut";

interface ILauncher {
    background: string;
    userData: { userName: string; name: { first: string; last: string } } | undefined;
    quickShortcuts: quickShortcut[];
    setQuickShortcuts: (value: quickShortcut[]) => void;
}

const Launcher: React.FC<ILauncher> = ({ background, userData, quickShortcuts, setQuickShortcuts }) => {
    const [slideoutVisible, setSlideoutVisible] = useState(false);

    return (
        <>
            <button
                type="button"
                className={styles.launcher}
                onClick={() => {
                    setSlideoutVisible(!slideoutVisible);
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
                backgroundImage={background}
                userNames={userData?.name || { first: "", last: "" }}
                setVisibility={(value: boolean) => {
                    setSlideoutVisible(value);
                }}
                visible={slideoutVisible}
                addQuickShortcut={(shortcut: QuickShortcut) => {
                    setQuickShortcuts([...quickShortcuts, shortcut]);
                }}
                userName={userData?.userName || "ERROR"}
            />
        </>
    );
};

export default Launcher;
