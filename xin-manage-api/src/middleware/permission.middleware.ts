import { Admin } from "@models/admin.model";
import { TPermission } from "@models/permision.model";
import { RolePermission } from "@utils/role-permission";
import { NextFunction, Request, Response } from "express";

export default function permissionMiddleware(permission: TPermission) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let admin = new Admin(req.admin as any);
      let role = admin.role as never;

      if (!(RolePermission[role] as any).includes(permission)) {
        return res.status(403).json({
          message: "You don't have permission to access this resource",
        });
      }

      next();
    } catch (err: any) {
      next(err);
    }
  };
}
