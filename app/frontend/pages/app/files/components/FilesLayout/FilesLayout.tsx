import FilesSideBar from "./FilesSideBar/FilesSideBar";
import styles from "./FilesLayout.module.scss";
import React from "react";
import Chiplet from "~/chipletui";
import FilesHeader from "./FilesHeader/FilesHeader";

const FilesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.root}>
            <FilesSideBar currentDir="/" />
            <Chiplet.Column className={styles.pane}>
                <FilesHeader />
                {children}
            </Chiplet.Column>
        </div>
    );
};

export default FilesLayout;
