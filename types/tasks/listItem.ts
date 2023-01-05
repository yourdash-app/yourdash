import TasksTag from "./tag";

export default interface TasksListItem {
  title: string,
  description: string,
  tags: TasksTag[],
  assignees: string[]
}