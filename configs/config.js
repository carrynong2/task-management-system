const ENV = process.env.NODE_ENV || "dev";

const APPLICATION_NAME = "task-management-service";

const PORT = process.env.PORT || 8080;

const MONGO_DOMAIN = process.env.MONGO_DOMAIN || "localhost:27017";
const DB_NAME = process.env.DB_NAME || "task_management";

const MONGO_DB_URL = `mongodb://${MONGO_DOMAIN}/${DB_NAME}`;

const LOG_SEV_LEVEL = process.env.LOG_SEV_LEVEL || "debug";

const BASE_PATH = process.cwd();

export { PORT, MONGO_DB_URL, LOG_SEV_LEVEL, BASE_PATH, APPLICATION_NAME };
