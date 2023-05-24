import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../domain/tasks/task.service.js";
import TaskModel from "../domain/tasks/task.schema.js";

jest.mock("../domain/tasks/task.schema.js");

describe("Task Service", () => {
  test("Get All Tasks -> Success", async () => {
    // Given
    const mockTasks = [
      {
        _id: "6468dd28749e7ff2b1554e1c",
        title: "Test1",
        status: "TODO",
        __v: 0,
      },
    ];
    TaskModel.find.mockReturnValue({
      exec: jest.fn().mockReturnValue(mockTasks),
    });
    // When
    const actualResult = await getTasks();
    // Then
    expect(actualResult).toStrictEqual([
      {
        _id: "6468dd28749e7ff2b1554e1c",
        title: "Test1",
        status: "TODO",
        __v: 0,
      },
    ]);
  });

  test("Create Task -> Success", async () => {
    const mockResponse = {
      _id: "6468dd28749e7ff2b1554e1c",
      title: "Test1",
      status: "TODO",
      __v: 0,
    };
    TaskModel.mockImplementation(() => ({
      save: jest.fn().mockReturnValue(mockResponse),
    }));
    // When
    const body = {
      title: "Test1",
      status: "TODO",
    };
    const actualResult = await createTask(body);
    // Then
    expect(actualResult).toBeTruthy();
    expect(actualResult._id).toBe("6468dd28749e7ff2b1554e1c");
    expect(actualResult.title).toBe("Test1");
    expect(actualResult.status).toBe("TODO");
  });

  test("Update Task -> Success", async () => {
    const mockResponse = {
      _id: "6468dd28749e7ff2b1554e1c",
      title: "Test1",
      status: "IN_PROGRESS",
      __v: 0,
    };
    TaskModel.findByIdAndUpdate.mockReturnValue(mockResponse);

    const taskId = "6468dd28749e7ff2b1554e1c";
    const data = { status: "IN_PROGRESS" };
    const actualResult = await updateTask({ taskId, data });

    expect(actualResult).toBeTruthy();
    expect(actualResult._id).toBe("6468dd28749e7ff2b1554e1c");
    expect(actualResult.title).toBe("Test1");
    expect(actualResult.status).toBe("IN_PROGRESS");
  });

  test("Update Task -> Fail", async () => {
    TaskModel.findByIdAndUpdate.mockReturnValue(null);
    const taskId = "wronglyId";
    const data = { status: "IN_PROGRESS" };
    expect(async () => await updateTask({ taskId, data })).rejects.toThrow();
  });

  test("Delete Task -> Success", async () => {
    const mockResponse = {
      _id: "6468dd28749e7ff2b1554e1c",
      title: "Test1",
      status: "TODO",
      __v: 0,
    };
    TaskModel.findByIdAndDelete.mockReturnValue(mockResponse);
    const taskId = "6468dd28749e7ff2b1554e1c";
    expect(async () => await deleteTask(taskId)).not.toThrow();
  });

  test("Delete Task -> Fail", async () => {
    TaskModel.findByIdAndDelete.mockReturnValue(null);
    const taskId = "6468dd28749e7ff2b1554e1c";
    expect(async () => await deleteTask(taskId)).rejects.toThrow();
  });
});
