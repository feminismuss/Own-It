import Plan from "@/db/models/Plan";
import dbConnect from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const { token } = request.query;

  if (request.method === "GET") {
    try {
      const plan = await Plan.findOne({ inviteToken: token });
      if (!plan) return response.status(404).json({ error: "Plan not found" });
      response.status(200).json(plan);
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
      const plan = await Plan.findOne({ inviteToken: token });
      if (!plan) return response.status(404).json({ error: "Plan not found" });
      const allreadyMember = plan.members.includes(session.user.id);
      if (allreadyMember) {
        return response.status(400).json({ error: "Allready a member" });
      }
      plan.members.push(session.user.id);
      await plan.save();
      response.status(200).json({ message: "Joined successfully" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
