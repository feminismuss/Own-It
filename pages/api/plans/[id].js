import Plan from "@/db/models/Plan";
import dbConnect from "@/db/connect";

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
