/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

export interface task {
  execute: () => void;
  timestamp: string;
  id: string;
  subTasks?: task[];
  completed?: boolean;
}

export default class TaskQueue {
  queue: task[];

  constructor() {
    this.queue = [];

    return this;
  }

  addTask(task: task) {
    this.queue.push(task);

    return this;
  }

  getQueue() {
    return this.queue;
  }

  clearQueue() {
    this.queue = [];

    return this;
  }

  getQueueLength() {
    return this.queue.length;
  }

  getTaskById(id: string) {
    return this.queue.find((task) => task.value === id);
  }
}
