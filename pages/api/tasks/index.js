import dbConnect from "@/db/connect";
import Task from "@/db/models/Task";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const { planId } = request.query;
      const filter = planId ? { plan: planId } : {};
      const tasks = await Task.find(filter)
        .sort({ createdAt: -1 })
        .populate("assignedTo", "name");
      response.status(200).json(tasks);
      return;
    } catch (error) {
      response.status(500).json({ error: error.message });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const taskData = request.body;
      const taskToCreate = await Task.create(taskData);
      response.status(201).json(taskToCreate);
    } catch (error) {
      response.status(400).json({ error: error.message });
      return;
    }
  }
  return response.status(405).json({ error: "Method not allowed" });
}
