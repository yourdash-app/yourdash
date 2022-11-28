import React from "react"
import Icon from "../../../../components/elements/icon/Icon"
import ProgressBar from "../../../../components/elements/progressBar/ProgressBar"
import styles from "./FilesSideBar.module.scss"

export interface IFilesSideBar {
  currentDir: string
}

const FilesSideBar: React.FC<IFilesSideBar> = ({ currentDir }) => {
  return <div className={styles.component}>
    <h2 className={styles.dirName}>{currentDir}</h2>
    <ul className={styles.dirShortcuts}>
      <h3>Home</h3>
      <ul>
        <li>
          <span>Home</span>
          <div>...</div>
        </li>
        <li>
          <span>Photos</span>
          <div>...</div>
        </li>
        <li>
          <span>Music</span>
          <div>...</div>
        </li>
      </ul>
      <h3>Category</h3>
      <ul>
        <li>
          <span>C:</span>
          <div>...</div>
        </li>
        <li>
          <span>D:</span>
          <div>...</div>
        </li>
        <li>
          <span>E:</span>
          <div>...</div>
        </li>
      </ul>
    </ul>
    <section className={styles.footer}>
      {/*
        <div className={styles.usageIcons}>
          <Icon name="codespaces-16" color="#ffffff" />
          <Icon name="codespaces-16" color="#ffffff" />
          <Icon name="codespaces-16" color="#ffffff" />
        </div>
      */}
      <div className={styles.quota}>
        <div className={styles.header}>
          Quota percentage full
        </div>
        <ProgressBar value={40} displayPercentage></ProgressBar>
      </div>
    </section>
  </div >
}

export default FilesSideBar