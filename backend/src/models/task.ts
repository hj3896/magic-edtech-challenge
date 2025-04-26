import { Schema, model } from "mongoose";
import { Task } from "../types/task";

const TaskSchema = new Schema<Task>(
  {
    name: { type: String, required: true },
    description: String,
    due: { type: Date, required: true },
    complete: { type: Boolean, default: false },
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    updated_by: { type: Schema.Types.ObjectId, ref: "User" },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<Task>("Task", TaskSchema);
