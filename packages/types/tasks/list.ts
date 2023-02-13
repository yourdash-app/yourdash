import { type Tag } from "../core/tag";
import { type TasksListItem } from "./listItem";

interface TasksList {
  id: string,
  name: string,
  tasks: TasksListItem[],
  description: string,
  tags: Tag[]
}

export type { TasksList }