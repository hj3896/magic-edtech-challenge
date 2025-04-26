import { Schema, model } from "mongoose";
import { User } from "../types/user";

const UserSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

export default model<User>("User", UserSchema);
