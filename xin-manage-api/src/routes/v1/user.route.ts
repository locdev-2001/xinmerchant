import { Router } from "express";
import BaseRouter from "../base.route";
import UserController from "@controllers/user.controller";
import UserValidator from "@validators/user.validator";
import adminMiddleware from "@middleware/admin.middleware";
import { formValidate } from "@validators/index";
import permissionMiddleware from "@middleware/permission.middleware";

export default class UserRouter extends BaseRouter {
  private controller = new UserController();
  private validator = new UserValidator();

  constructor(router: Router) {
    super({ pathBase: "/user", router });
  }

  instance() {
    this.router.put(
      this.path("/change-email"),
      adminMiddleware,
      permissionMiddleware("write_change_email"),
      formValidate(this.validator.updateEmail()),
      this.controller.updateEmail.bind(this.controller)
    );
  }
}
