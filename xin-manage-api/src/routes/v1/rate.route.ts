import { Router } from "express";
import BaseRouter from "../base.route";
import adminMiddleware from "@middleware/admin.middleware";
import { formValidate } from "@validators/index";
import RateController from "@controllers/rate.controller";
import RateValidator from "@validators/rate.validator";
import permissionMiddleware from "@middleware/permission.middleware";

export default class RateRouter extends BaseRouter {
  private controller = new RateController();
  private validator = new RateValidator();

  constructor(router: Router) {
    super({ pathBase: "/rate", router });
  }

  instance() {
    this.router.put(
      this.path("/name"),
      adminMiddleware,
      permissionMiddleware("write_update_rate"),
      formValidate(this.validator.updateRate()),
      this.controller.updateRateByName.bind(this.controller)
    );

    this.router.get(
      this.path("/name"),
      this.controller.getRateByName.bind(this.controller)
    );
  }
}
