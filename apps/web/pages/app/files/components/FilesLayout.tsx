import FilesSideBar from "./FilesSideBar";
import styles from "./FilesLayout.module.scss"
import ColContainer from "ui/backup/containers/ColContainer/ColContainer";
import React from "react";

const FilesLayout: React.FC<{ children: React.ReactNode}> = ({ children }) => {return (
  <div className={ styles.root }>
    <FilesSideBar currentDir="/"/>
    <ColContainer className={ styles.pane }>
      {children}
    </ColContainer>
  </div>
)};

export default FilesLayout;
