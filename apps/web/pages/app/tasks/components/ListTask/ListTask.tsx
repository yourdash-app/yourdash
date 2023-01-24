import React from "react"
import styles from "./ListTask.module.scss"
import TasksListItem from "../../../../../types/tasks/listItem";
import IconButton from "../../../../../components/elements/iconButton/IconButton";

export interface IListTask {
  task: TasksListItem
}

const ListTask: React.FC<IListTask> = ({ task }) => {
  return <div className={styles.component}>
    <input type="checkbox"/>
    <h2>{task.title}</h2>
    <div>
      {/*  assignees  */}
    </div>
    <IconButton icon={"trash-16"}/>
  </div>
}

export default ListTask
