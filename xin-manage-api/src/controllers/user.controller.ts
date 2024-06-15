import { Admin, AdminDTO } from "@models/admin.model";
import UserService from "@services/user.service";
import { NextFunction, Request, Response } from "express";

export default class UserController {
  private userService = new UserService();

  async updateEmail(req: Request, res: Response, next: NextFunction) {
    try {
      let {email, newEmail} = req.body
      let admin = new AdminDTO(req.admin as any)
      let data = await this.userService.updateEmail({
        email, 
        newEmail,
        adminId: admin?.id||""
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
