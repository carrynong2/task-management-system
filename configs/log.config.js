import winston, { format } from "winston";
import { APPLICATION_NAME, BASE_PATH, LOG_SEV_LEVEL } from "./config.js";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, json, timestamp } = winston.format;

const LOG_DIRECTORY = `${BASE_PATH}/logs`;

const defaultFormat = combine(
  timestamp({
    format: "YYYY-MM-DD HHmm",
  }),
  json()
);

function generateWinstonRotateConfig(level) {
  let fileName = `${LOG_DIRECTORY}/${APPLICATION_NAME}-%DATE%.log`;
  if (level === "error") {
    fileName = `${LOG_DIRECTORY}/${APPLICATION_NAME}-error-%DATE%.log`;
  }
  return new DailyRotateFile({
    filename: fileName,
    datePattern: "YYYY-MM-DD",
    maxSize: "10m",
    level,
  });
}

const fileTransports = [
  generateWinstonRotateConfig(LOG_SEV_LEVEL),
  generateWinstonRotateConfig("error"),
];

const logger = winston.createLogger({
  level: LOG_SEV_LEVEL,
  format: defaultFormat,
  defaultMeta: { service: APPLICATION_NAME },
  transports: [],
});

if (process.env.NODE_ENV !== "test") {
  fileTransports.forEach((t) => {
    logger.add(t);
  });
}

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: defaultFormat,
    })
  );
}

export default logger;
