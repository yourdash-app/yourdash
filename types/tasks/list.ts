import TasksListItem from "./listItem";

export default interface TasksList {
  type: "public" | "private",
  id: number,
  name: string,
  items: TasksListItem[]
}