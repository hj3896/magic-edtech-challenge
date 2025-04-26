import dotenv from "dotenv";
import connectDB from "./configs/db";
import app from "./app";
import { log, setupLogging } from "./configs/logger";

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
