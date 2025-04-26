import mongoose from "mongoose";
import { log } from "./logger";

const connectDB = async (): Promise<void> => {
  try {
    const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/tasks";
    await mongoose.connect(dbURI);
    log.info("MongoDB connected successfully");
  } catch (err) {
    log.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;
