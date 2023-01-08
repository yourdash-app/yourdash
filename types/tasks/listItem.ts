import Tag from "../core/tag"

export default interface TasksListItem {
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