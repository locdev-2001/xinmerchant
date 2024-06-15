import logger from "@services/vendors/logger.service";
import { connect, connection } from "mongoose";
import { ENV } from "./env.config";

export async function connectMongoDB(): Promise<void> {
  try {
    await connect(
      `mongodb://${ENV.MONGO_USER}:${ENV.MONGO_PASS}@${ENV.MONGO_HOST}:${ENV.MONGO_PORT}`,
      {
        dbName: "xin-beta",
        connectTimeoutMS: 5000
      }
    );
    logger.info("Connect database success");
  } catch (err) {
    logger.error(err);
    setTimeout(() => {
        logger.info("Reconnecting database...")
        connectMongoDB()
    }, 3000);
  }
}

export async function closeMongoDB(): Promise<void> {
  await connection.close();
}
