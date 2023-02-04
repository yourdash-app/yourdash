import React from "react"
import styles from "./ListTask.module.scss"
import { type TasksListItem } from "types/tasks/listItem";
import Chiplet from "ui";

export interface IListTask {
  task: TasksListItem
}

const ListTask: React.FC<IListTask> = ({ task }) => {return (
  <div className={ styles.component }>
    <input type="checkbox"/>
    <h2>{task.title}</h2>
    <div>
      {/*  assignees  */}
    </div>
    <Chiplet.IconButton icon={ "trash-16" }/>
  </div>
)}

export default ListTask
