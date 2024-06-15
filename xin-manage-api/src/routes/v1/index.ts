import { Router } from "express";
import AdminRouter from "./admin.route";
import UserRouter from "./user.route";
import StatisticsRouter from "./statistics.route";
import RateRouter from "./rate.route";


export function RoutersV1() {
  const router = Router();
  new AdminRouter(router).instance();
  new UserRouter(router).instance();
  new StatisticsRouter(router).instance();
  new RateRouter(router).instance()

  return router;
}
