import dbConnect from "@/db/connect";
import Plan from "@/db/models/plan";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const plans = await Plan.find().sort({ createdAt: -1 });
      response.status(200).json(plans);
      return;
    } catch (error) {
      response.status(500).json({ error: error.message });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const planData = request.body;
      const planToCreate = await Plan.create(planData);
      response.status(201).json(planToCreate);
    } catch (error) {
      response.status(400).json({ error: error.message });
      return;
    }
  }
}
