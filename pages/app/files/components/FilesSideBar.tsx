import React from "react"
import Icon from "../../../../components/elements/icon/Icon"

export interface IFilesSideBar {
  currentDir: string
}

const FilesSideBar: React.FC<IFilesSideBar> = ({ currentDir }) => {
  return <div>
    <h2>{currentDir}</h2>
    <ul>
      <li>
        <span></span>
        <div></div>
      </li>
    </ul>
    <section>
      <Icon name="codespaces-16" />
    </section>
  </div>
}

export default FilesSideBar