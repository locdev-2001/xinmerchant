import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";

import { RoutersV1 } from "./routes/v1";
import { AppError } from "@models/error";
import moment from "moment";
import { connectMongoDB } from "@config/db.config";
import { ENV } from "@config/env.config";
import { Admin } from "@models/admin.model";
import { User } from "@models/user.model";

const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(cors());
app.use(express.json({ limit: "1500mb" }));
app.use(express.urlencoded({ limit: "1500mb", extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

declare module "express" {
  export interface Request {
    language?: string;
    admin?: Admin;
    user?: User;
    usageId?: string;
  }
}

// Connect database
(async () => {
  await connectMongoDB();
})();

// Handle accept language
function handleLanguage(req: Request, res: Response, next: NextFunction) {
  let language = req.headers["accept-language"] as any;
  if (language != "vi-VN" && language != "en-US") language = "vi-VN";
  req.language = language;
  next();
}
app.use(handleLanguage);

const buildDate = moment().utc().add(7, "hours");
app.get("/", (req: Request, res: Response) => {
  const openDate = moment().utc().add(7, "hours");
  res.json({
    env: ENV.NODE_ENV,
    buildDate: buildDate.format("DD/MM/YYYY HH:mm:ss A"),
    fromNow: buildDate.from(openDate),
  });
});

// Add APIs
app.use("/v1", RoutersV1());

app.use(
  (err: AppError | any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      console.log(err);
      res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR);
      switch (err.constructor) {
        case AppError:
          err.translate(getLocaleFromRequest(req));
          delete err["level"];
          delete err["label"];
          res.json(err);
          break;
        default:
          res.json({ message: "System Error", detail: err });
          break;
      }
    }
    next();
  }
);

function getLocaleFromRequest(req: Request) {
  const language = req.headers["accept-language"];
  if (!language) return "vi-VN";

  return language;
}

// Export express instance
export default app;
