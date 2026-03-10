import mongoose from "mongoose";

const { Schema } = mongoose;

const planSchema = new Schema(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true },
);

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default Plan;
