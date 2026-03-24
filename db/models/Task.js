import mongoose from "mongoose";

const {Schema} = mongoose;

const taskSchema = new Schema(
    {
        title: {type: String, required: true},
        plan: { type: Schema.Types.ObjectId, ref: "Plan", required: true},
        status: {type: String, enum: ["todo", "inprogress", "done"], default: "todo"},
        assignedTo: {type: Schema.Types.ObjectId, ref: "User"}
    },
    {timestamps: true}
)

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema)

export default Task; 