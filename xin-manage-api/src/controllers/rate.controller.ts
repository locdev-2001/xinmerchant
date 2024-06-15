import { Admin } from "@models/admin.model";
import RateService from "@services/rate.service";
import { NextFunction, Request, Response } from "express";

export default class RateController {
  private rateService = new RateService();

  async getRateByName(req: Request, res: Response, next: NextFunction) {
    try {
      let name = req.query?.name?.toString() || "";
      let data = await this.rateService.getByName(name);
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }

  async updateRateByName(req: Request, res: Response, next: NextFunction) {
    try {
      let admin = new Admin(req.admin as any);
      let { name, rate } = req.body;
      let data = await this.rateService.updateRateByName({
        name,
        rate,
        adminId: admin?.id || "",
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  }
}
