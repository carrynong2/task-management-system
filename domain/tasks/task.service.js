import TaskModel from "./task.schema.js";
import logger from "../../configs/log.config.js";

export async function getTasks() {
  const tasks = await TaskModel.find({}).exec();
  logger.debug({
    tasks,
  });
  return tasks;
}

export async function createTask(task) {
  logger.debug({ task });
  const prepareTask = new TaskModel({
    title: task.title,
    status: task.status,
  });
  logger.debug({ prepareTask });
  const newlyTask = await prepareTask.save();
  logger.debug({ newlyTask });
  return newlyTask;
}

export async function updateTask(taskDetail) {
  const { taskId, data } = taskDetail;
  logger.debug({ taskDetail });
  const updatedTask = await TaskModel.findByIdAndUpdate(taskId, data, {
    new: true,
  });
  if (!updatedTask) {
    logger.error(
      `TaskId: ${taskId} not found, cannot make the update operation`
    );
    throw new Error("NF_0001");
  }
  logger.info({ updateTask });
  return updatedTask;
}

export async function deleteTask(taskId) {
  const deletedTask = await TaskModel.findByIdAndDelete(taskId);
  if (!deletedTask) {
    logger.error(
      `TaskId: ${taskId} not found, cannot make the delete operation`
    );
    throw new Error("NF_0001");
  }
  logger.error(`TaskId: ${taskId} deleted`);
}
