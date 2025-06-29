import { v4 as uuidv4 } from "uuid";
const tasks = new Map();
export const createTask = (taskData) => {
  const taskId = uuidv4();
  tasks.set(taskId, { ...taskData, status: "running", startTime: Date.now() });
  return taskId;
};

export const updateTask = (taskId, updates) => {
  if (tasks.has(taskId)) {
    const task = tasks.get(taskId);
    tasks.set(taskId, { ...task, ...updates });
  }
};
export const getTask = (taskId) => tasks.get(taskId);
export const deleteTask = (taskId) => {
  tasks.delete(taskId);
};
