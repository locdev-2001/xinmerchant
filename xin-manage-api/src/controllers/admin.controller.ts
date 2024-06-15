import { AdminDTO } from "@models/admin.model";
import AdminService from "@services/admin.service";
import { NextFunction, Request, Response } from "express";

export default class AdminController {
  private adminService = new AdminService();

  async createSuperAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      let data = await this.adminService.createSuperAdmin(req.body);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let data = await this.adminService.login(req.body);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try{
      let data = await this.adminService.getProfile(req.admin as any)
      return res.json(data)
    }
    catch(err){
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      let admin = new AdminDTO(req.admin as any);
      let data = await this.adminService.create({
        data: req.body,
        adminId: admin?.id || "",
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      let admin = new AdminDTO(req.admin as any);
      let { id } = req.params;
      let data = await this.adminService.updateById({
        adminId: admin?.id || "",
        id,
        data: req.body,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      let admin = new AdminDTO(req.admin as any);
      let { id } = req.params;
      let data = await this.adminService.deleteById({
        adminId: admin?.id || "",
        id,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      let { page, limit } = req.query;
      let data = await this.adminService.list({
        paginate: {
          page: Number(page || 1),
          limit: Number(limit || 10),
        },
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      let { id } = req.params;
      let data = await this.adminService.getById({ id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
