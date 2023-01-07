import TasksListItem from "./listItem";

export default interface TasksList {
  id: string,
  name: string,
  tasks: TasksListItem[],
  description: string
}