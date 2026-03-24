import dbConnect from "@/db/connect";
import Plan from "@/db/models/Plan";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) {
        return response.status(401).json({ error: "Not authenticated" });
      }
      const plans = await Plan.find({ $or: [{owner: session.user.id} , {members: session.user.id}] }).sort({
        createdAt: -1,
      });
      response.status(200).json(plans);
      return;
    } catch (error) {
      response.status(500).json({ error: error.message });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) {
        return response.status(401).json({ error: "Not authenticated" });
      }
      const planData = request.body;
      const planToCreate = await Plan.create({
        ...planData,
        owner: session.user.id,
      });
      response.status(201).json(planToCreate);
    } catch (error) {
      response.status(400).json({ error: error.message });
      return;
    }
  }
}
