import React, { useState } from "react";
import styles from "./FilesHeader.module.scss";
import Chiplet from "~/chipletui";
import { useRouter } from "next/router";

const FilesHeader: React.FC = () => {
    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);
    const [selectedFileType, setSelectedFileType] = useState("");

    return (
        <Chiplet.Row className={styles.component}>
            <Chiplet.Row className={styles.segment1}>
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
                <span className={styles.currentPath}>/{router?.query?.path?.toString().replaceAll(",", "/")}</span>
            </Chiplet.Row>
            <Chiplet.Dialog
                visible={showDialog}
                onClose={() => {
                    return setShowDialog(false);
                }}
            >
                <Chiplet.Column>
                    <h2 className={styles.createNewFileDialogTitle}>Create new {selectedFileType} file</h2>
                    <Chiplet.TextInput />
                </Chiplet.Column>
            </Chiplet.Dialog>
            <Chiplet.Row>
                <Chiplet.DropdownIconButton
                    icon={"plus-16"}
                    items={[
                        {
                            name: "Typescript",
                            onClick() {
                                // TODO: create typescript file
                                setShowDialog(true);
                                setSelectedFileType("Typescript");
                                return console.log("TODO");
                            },
                        },
                        {
                            name: "Javascript",
                            onClick() {
                                // TODO: create javascript file
                                setShowDialog(true);
                                setSelectedFileType("Javascript");
                                return console.log("TODO");
                            },
                        },
                        {
                            name: "Plain text",
                            onClick() {
                                // TODO: create plaintext file
                                setShowDialog(true);
                                setSelectedFileType("Plain Text");
                                return console.log("TODO");
                            },
                        },
                        {
                            name: "JSON",
                            onClick() {
                                // TODO: create json file
                                setShowDialog(true);
                                setSelectedFileType("JSON");
                                return console.log("TODO");
                            },
                        },
                    ]}
                />
            </Chiplet.Row>
        </Chiplet.Row>
    );
};

export default FilesHeader;
