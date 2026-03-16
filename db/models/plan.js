import mongoose from "mongoose";

const { Schema } = mongoose;

const PLAN_COLORS = ["#6B8FA8", "#E8725A", "#8FA86B", "#A86B8F", "#fdee92"];

const planSchema = new Schema(
  {
    name: { type: String, required: true },
    color: {
      type: String,
      default: () =>
        PLAN_COLORS[Math.floor(Math.random() * PLAN_COLORS.length)],
    },
  },
  { timestamps: true }
);

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default Plan;
