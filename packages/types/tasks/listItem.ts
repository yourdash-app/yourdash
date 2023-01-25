import { type Tag } from "../core/tag"

interface TasksListItem {
  title: string,
  description: string,
  tags: Tag[],
  assignees: string[],
  subTasks: {
    title: string,
    description: string,
    tags: string
  }[]
}

export { type TasksListItem }