import Chiplet from "ui";
import styles from "./File.module.scss";
import React from "react";
import { useRouter } from "next/router";

export interface IFile {
    name: string;
    path: string;
    type: "file" | "folder";
}

const File: React.FC<IFile> = ({ name, path, type }) => {
    const router = useRouter();

    return (
        <Chiplet.RightClickMenu
            items={[
                {
                    name: "Delete",
                    onClick: () => {
                        console.log(`Implement Me!!!`);
                    },
                },
            ]}
        >
            <Chiplet.Card
                onClick={() => {
                    switch (type) {
                        case "file":
                            switch (name.split(".").at(-1)) {
                                case "tsx":
                                case "jsx":
                                case "js":
                                case "ts":
                                case "json":
                                case "eslintrc":
                                case "editorconfig":
                                case "txt":
                                case "config":
                                case "conf":
                                    // text edit
                                    // TODO: link to the respective application
                                    break;
                                case "mp4":
                                case "mp3":
                                case "mov":
                                case "wav":
                                case "opus":
                                case "avi":
                                case "av1":
                                    // media player
                                    // TODO: link to the respective application
                                    break;
                                case "png":
                                case "webp":
                                case "jpg":
                                case "jpeg":
                                    // image viewer
                                    // TODO: link to the respective application
                                    break;
                            }
                            break;
                        case "folder":
                            router.push(`/app/files/p${path}`);
                            break;
                    }
                }}
                className={styles.component}
            >
                <Chiplet.Icon color={"var(--card-fg)"} name={type === "file" ? "file-16" : "file-directory-16"} />
                <span>{name}</span>
                <span>{type}</span>
            </Chiplet.Card>
        </Chiplet.RightClickMenu>
    );
};

export default File;
