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
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    inviteToken: { type: String, unique: true, sparse: true },
  },
  { timestamps: true }
);

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default Plan;
