import path from "path";
import dotenv from "dotenv";
import commandLineArgs from "command-line-args";

(() => {
  // Setup command line options
  const options = commandLineArgs([
    {
      name: "env",
      alias: "e",
      defaultValue: "development",
      type: String,
    },
    {
      name: "detectOpenHandles",
      alias: "d",
      defaultValue: true,
      type: Boolean,
    },
    {
      name: "collectCoverage",
      alias: "c",
      defaultValue: true,
      type: Boolean,
    },
  ]);
  // Set the env file
  const result2 = dotenv.config({
    path: path.join(__dirname, `../../env/.env.${options.env}`),
  });
  if (result2.error) {
    throw result2.error;
  }
})();

export const ENV = {
  JWT_SIGNING_KEY: process.env.JWT_SIGNING_KEY,
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASS: process.env.MONGO_PASS,
  MONGO_DB: process.env.MONGO_DB,
  MONGO_PORT: process.env.MONGO_PORT,
  NODE_ENV: process.env.NODE_ENV,
  KEY_CREATE: process.env.KEY_CREATE,
};
