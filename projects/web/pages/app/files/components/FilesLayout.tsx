import FilesSideBar from "./FilesSideBar";
import styles from "./FilesLayout.module.scss";
import React from "react";
import Chiplet from "ui";
import { useRouter } from "next/router";

const FilesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    return (
        <div className={styles.root}>
            <FilesSideBar currentDir="/" />
            <Chiplet.Column className={styles.pane}>
                <Chiplet.Row className={styles.header}>
                    <Chiplet.Row className={styles.headerSegment1}>
                        <Chiplet.IconButton
                            disabled={!router.query.path}
                            icon={"arrow-left-16"}
                            color={"var(--button-fg)"}
                            onClick={() => {
                                const pathObject = router.query.path as string[];
                                if (!pathObject) return;
                                pathObject.pop();
                                router.push(`/app/files/p/${pathObject.toString().replaceAll(",", "/")}`);
                            }}
                        />
                        <span className={styles.currentPath}>
                            /{router?.query?.path?.toString().replaceAll(",", "/")}
                        </span>
                    </Chiplet.Row>
                    <Chiplet.Row>
                        <Chiplet.DropdownIconButton
                            icon={"plus-16"}
                            items={[
                                {
                                    name: "Typescript",
                                    onClick() {
                                        // TODO: create typescript file
                                        return console.log("TODO");
                                    },
                                },
                                {
                                    name: "Javascript",
                                    onClick() {
                                        // TODO: create javascript file
                                        return console.log("TODO");
                                    },
                                },
                                {
                                    name: "Plain text",
                                    onClick() {
                                        // TODO: create plaintext file
                                        return console.log("TODO");
                                    },
                                },
                                {
                                    name: "JSON",
                                    onClick() {
                                        // TODO: create json file
                                        return console.log("TODO");
                                    },
                                },
                            ]}
                        />
                    </Chiplet.Row>
                </Chiplet.Row>
                {children}
            </Chiplet.Column>
        </div>
    );
};

export default FilesLayout;
