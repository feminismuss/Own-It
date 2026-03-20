import dbConnect from "@/db/connect";
import Plan from "@/db/models/Plan";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import crypto from "crypto";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const session = await getServerSession(request, response, authOptions);
      if (!session) {
        return response.status(401).json({ error: "Not authenticated" });
      }
      const { id } = request.query;
      const plan = await Plan.findById(id);

      if (!plan) {
        return response.status(404).json({ error: "Plan not found" });
      }
      if (plan.owner.toString() !== session.user.id) {
        return response.status(403).json({ error: "Not the owner" });
      }
      const token = crypto.randomBytes(16).toString("hex");
      plan.inviteToken = token;
      await plan.save();
      return response.status(200).json({ token });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }
  return response.status(405).json({ error: "Method not allowed" });
}
