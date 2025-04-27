import winston, { Logger } from "winston";
import morgan from "morgan";
const rfs = require("rotating-file-stream");
import express from "express";

const accessLogStream = rfs.createStream("application.log", {
  interval: "1d",
  path: "/tmp",
});

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

const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export const setupLogging = (app: express.Express): void => {
  app.use(morgan("combined", { stream: accessLogStream }));

  app.use(morgan("combined", { stream: morganStream }));
};

export const log = logger;
