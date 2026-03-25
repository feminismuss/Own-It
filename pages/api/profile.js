import dbConnect from "@/db/connect";
import Plan from "@/db/models/Plan";
import Task from "@/db/models/Task";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) {
        return response.status(401).json({ error: "Not authenticated" });
      }
      const ownedPlans = await Plan.countDocuments({ owner: session.user.id });
      const joinedPlans = await Plan.countDocuments({
        members: session.user.id,
      });
      const completedTasks = await Task.countDocuments({
        status: "done",
        assignedTo: session.user.id,
      });

      return response
        .status(200)
        .json({ ownedPlans, joinedPlans, completedTasks });
    } catch (error) {
      response.status(500).json({ error: error.message });
      return;
    }
  }
  return response.status(405).json({ error: "Method not allowed" });
}
