import { type Tag } from "../core/tag.js";
import { type TasksListItem } from "./listItem.js";

interface TasksList {
    id: string;
    name: string;
    tasks: TasksListItem[];
    description: string;
    tags: Tag[];
}

export type { TasksList };
