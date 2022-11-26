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
        <span>Home</span>
        <div>...</div>
      </li>
      <ul>
        <h3>Category</h3>
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
    <section>
      <div>
        <Icon name="codespaces-16" color="#ffffff" />
        <Icon name="codespaces-16" color="#ffffff" />
        <Icon name="codespaces-16" color="#ffffff" />
      </div>
      <div>
        Quota percentage bar
      </div>
    </section>
  </div >
}

export default FilesSideBar