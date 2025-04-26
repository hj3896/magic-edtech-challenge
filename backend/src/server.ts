import dotenv from "dotenv";
import connectDB from "./configs/db";
import app from "./app";
import { log, setupLogging } from "./configs/logger";
import user from "./models/user";
import bcrypt from "bcryptjs";

dotenv.config();

const PORT = process.env.PORT || 5200;

setupLogging(app);
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      log.info(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    log.error("DB connection failed:", err);
  });

async function init() {
  let password = await bcrypt.hash("password", 10);
  user
    .findOneAndUpdate(
      { username: "admin" },
      {
        username: "admin",
        password: password,
        role: "admin",
      },
      { upsert: true }
    )
    .then((val) => {
      log.info("Admin Document Inserted");
    });
}
init();
