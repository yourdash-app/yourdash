import React from "react"
import { type TasksListItem } from "types/tasks/listItem";
import Chiplet from "ui";
import styles from "./ListTask.module.scss"

export interface IListTask {
  task: TasksListItem,
  onClick: () => void,
  selectTask: (value: boolean) => void,
  onDelete: () => void
}

const ListTask: React.FC<IListTask> = ({ task, onClick, selectTask, onDelete }) => {
  return (
    <Chiplet.Card className={ styles.component } compact onClick={ onClick }>
      <input
        type="checkbox"
        onClick={
              e => {
                e.stopPropagation()
                selectTask(e.currentTarget.checked)
              }
            }
      />
      <h2>{task?.title}</h2>
      <div>
        {/*  assignees  */}
      </div>
      <Chiplet.IconButton
        icon={ "trash-16" }
        onClick={ e => {
              e.stopPropagation()
              onDelete()
            } }
      />
    </Chiplet.Card>
  )
}

export default ListTask
