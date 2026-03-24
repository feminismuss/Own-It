import Task from "@/db/models/Task";
import dbConnect from "@/db/connect";
import Plan from "@/db/models/Plan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const task = await Task.findById(id).populate("assignedTo", "name");
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
      const session = await getServerSession(request, response, authOptions);
      if (!session) {
        return response.status(401).json({ error: "Not authenticated" });
      }

      const task = await Task.findById(id);
      if (!task) {
        return response.status(404).json({ error: "Task not found" });
      }

      const plan = await Plan.findById(task.plan);
      if (!plan) {
        return response.status(404).json({ error: "Plan not found" });
      }

      if (plan.owner.toString() !== session.user.id) {
        return response.status(403).json({ error: "Not authorized" });
      }
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
  return response.status(405).json({ error: "Method not allowed" });
}
