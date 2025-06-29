import { runcode } from "../sandbox/sandbox.js";
import {
  createTask,
  updateTask,
  getTask,
  deleteTask,
} from "../status/status.js";
import { io } from "../index.js";
export const executeCode = async (req, res) => {
  const { sourceCode } = req.body;

  if (!sourceCode || typeof sourceCode !== "string") {
    return res.status(400).json({ error: "Invalid source code" });
  }

  const taskId = createTask({ linesOfCode: sourceCode.split("\n").length });
  const emitTaskUpdate = (taskId) => {
    const task = getTask(taskId);
    if (task) {
      io.emit("taskUpdate", { taskId, ...task });
    }
  };

  runcode(sourceCode)
    .then((result) => {
      updateTask(taskId, {
        status: "completed",
        output: result,
        endTime: Date.now(),
      });
      emitTaskUpdate(taskId)
    })
    .catch((error) => {
      updateTask(taskId, {
        status: "failed",
        error: error.message,
        endTime: Date.now(),
      });
      emitTaskUpdate(taskId);
    })
    .finally(() => {
      setTimeout(() => deleteTask(taskId), 60000);
    });

  res.status(202).json({ status: "submitted", taskId });
};
export const getTaskStatus = (req, res) => {
  const { taskId } = req.params;

  const task = getTask(taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.status(200).json(task);
};
