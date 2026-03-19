import Task from "@/db/models/Task";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const task = await Task.findById(id);
      response.status(200).json(task);
      return;
    } catch (error) {
      response.status(500).json({ error: error.message });
      return;
    }
  }

  if (request.method === "PUT") {
    try {
      const taskData = request.body;
      const taskToUpdate = await Task.findByIdAndUpdate(id, taskData, {
        new: true,
      });
      if (!taskToUpdate) {
        response.status(404).json({ status: "Task not found" });
        return;
      }
      response.status(200).json(taskToUpdate);
      return;
    } catch (error) {
      response.status(500).json({ status: "error updating task" });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      const taskToDelete = await Task.findByIdAndDelete(id);
      if (!taskToDelete) {
        response.status(404).json({ status: "Task not found" });
        return;
      }
      response.status(200).json("Task deleted");
      return;
    } catch (error) {
      response.status(500).json({ status: "failed to delete" });
      return;
    }
  }
}
