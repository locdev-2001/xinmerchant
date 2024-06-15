import { Router } from "express";
import BaseRouter from "../base.route";
import AdminController from "@controllers/admin.controller";
import AdminValidator from "@validators/admin.validator";
import { formValidate } from "@validators/index";
import adminMiddleware from "@middleware/admin.middleware";
import permissionMiddleware from "@middleware/permission.middleware";

export default class AdminRouter extends BaseRouter {
  private controller = new AdminController();
  private validator = new AdminValidator();

  constructor(router: Router) {
    super({ pathBase: "/admin", router });
  }

  instance() {
    this.router.post(
      this.path("/super-admin"),
      formValidate(this.validator.createSuperAdmin()),
      this.controller.createSuperAdmin.bind(this.controller)
    );

    this.router.post(
      this.path("/login"),
      formValidate(this.validator.login()),
      this.controller.login.bind(this.controller)
    );

    this.router.get(
      this.path("/profile"),
      adminMiddleware,
      this.controller.getProfile.bind(this.controller)
    );

    this.router.post(
      this.path("/"),
      adminMiddleware,
      permissionMiddleware("write_admin_account"),
      formValidate(this.validator.create()),
      this.controller.create.bind(this.controller)
    );

    this.router.put(
      this.path("/:id"),
      adminMiddleware,
      permissionMiddleware("write_admin_account"),
      formValidate(this.validator.update()),
      this.controller.updateById.bind(this.controller)
    );

    this.router.delete(
      this.path("/:id"),
      adminMiddleware,
      permissionMiddleware("write_admin_account"),
      this.controller.deleteById.bind(this.controller)
    );

    this.router.get(
      this.path("/"),
      adminMiddleware,
      permissionMiddleware("read_admin_account"),
      this.controller.list.bind(this.controller)
    );

    this.router.get(
      this.path("/:id"),
      adminMiddleware,
      permissionMiddleware("read_admin_account"),
      this.controller.getById.bind(this.controller)
    );

    
  }
}
