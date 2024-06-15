import { Router } from "express";
import BaseRouter from "../base.route";
import adminMiddleware from "@middleware/admin.middleware";
import StatisticsController from "@controllers/statistics.controller";
import permissionMiddleware from "@middleware/permission.middleware";

export default class StatisticsRouter extends BaseRouter {
  private controller = new StatisticsController();

  constructor(router: Router) {
    super({ pathBase: "/statistics", router });
  }

  instance() {
    this.router.get(
      this.path("/logs"),
      adminMiddleware,
      permissionMiddleware("read_logs"),
      this.controller.listLogs.bind(this.controller)
    );
  }
}
