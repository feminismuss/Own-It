import Plan from "@/db/models/Plan";
import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const plan = await Plan.findById(id).populate("members", "name");
      response.status(200).json(plan);
      return;
    } catch (error) {
      response.status(500).json({ error: error.message });
      return;
    }
  }

  if (request.method === "PUT") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) {
        return response.status(401).json({ error: "Not authenticated" });
      }
      const plan = await Plan.findById(id);
      if (!plan) {
        return response.status(404).json({ error: "Plan not found" });
      }
      if (plan.owner.toString() !== session.user.id) {
        return response.status(403).json({ error: "Not authorized" });
      }
      const planData = request.body;
      const planToUpdate = await Plan.findByIdAndUpdate(id, planData, {
        new: true,
      });
      if (!planToUpdate) {
        response.status(404).json({ status: "Plan not found" });
        return;
      }
      response.status(200).json(planToUpdate);
      return;
    } catch (error) {
      response.status(500).json({ status: "error updating plan" });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
        const session = await getServerSession(request, response, authOptions);
      if (!session) {
        return response.status(401).json({ error: "Not authenticated" });
      }
      const plan = await Plan.findById(id);
      if (!plan) {
        return response.status(404).json({ error: "Plan not found" });
      }
      if (plan.owner.toString() !== session.user.id) {
        return response.status(403).json({ error: "Not authorized" });
      }
      const planToDelete = await Plan.findByIdAndDelete(id);
      if (!planToDelete) {
        response.status(404).json({ status: "Plan not found" });
        return;
      }
      response.status(200).json("Plan deleted");
      return;
    } catch (error) {
      response.status(500).json({ status: "failed to delete" });
      return;
    }
  }
  return response.status(405).json({ error: "Method not allowed" });
}
