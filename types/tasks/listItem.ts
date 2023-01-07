import TasksTag from "./tag";

export default interface TasksListItem {
  title: string,
  description: string,
  tags: TasksTag[],
  assignees: string[],
  subTasks: {
    title: string,
    description: string,
    tags: string
  }[]
}