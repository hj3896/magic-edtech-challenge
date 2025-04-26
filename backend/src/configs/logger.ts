import winston, { Logger } from "winston";
import morgan from "morgan";
const rfs = require("rotating-file-stream");
import express from "express";

// Rotating file stream for access logs (Morgan)
const accessLogStream = rfs.createStream("application.log", {
  interval: "1d",
  path: "/tmp",
});

// Winston logger for application logs
const { combine, timestamp, printf, colorize } = winston.format;

const logger: Logger = winston.createLogger({
  format: combine(
    colorize(),
    timestamp(),
    printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}] : ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "/tmp/application.log",
      level: "info",
      maxFiles: 10,
      maxsize: 104857600,
    }),
  ],
});

// Optional: create a stream object for Morgan to write logs into Winston
const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Express middleware setup
export const setupLogging = (app: express.Express): void => {
  // Log HTTP requests to rotating file stream
  app.use(morgan("combined", { stream: accessLogStream }));

  // Optionally log HTTP requests to console via Winston
  app.use(morgan("combined", { stream: morganStream }));
};

// Export Winston logger for app use
export const log = logger;
