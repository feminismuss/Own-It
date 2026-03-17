import dbConnect from "@/db/connect";
import User from "@/db/models/User";
import bcrypt from "bcryptjs"

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const userData = request.body;
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return response.status(400).json({ error: "Email already exists" });
      }
const hashedPassword = await bcrypt.hash(userData.password, 10);
      const userToCreate = await User.create({...userData, password: hashedPassword});
      response.status(201).json(userToCreate);
    } catch (error) {
      response.status(400).json({ error: error.message });
      return;
    }
  }
}
