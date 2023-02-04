import FilesSideBar from "./FilesSideBar";
import styles from "./FilesLayout.module.scss"
import React from "react";
import Chiplet from "ui";

const FilesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={ styles.root }>
      <FilesSideBar currentDir="/"/>
      <Chiplet.Column className={ styles.pane }>
        {children}
      </Chiplet.Column>
    </div>
  )
};

export default FilesLayout;
